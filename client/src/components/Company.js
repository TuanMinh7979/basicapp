import { Autocomplete, Box, Button, Grid, IconButton, InputAdornment, ListItemIcon, ListItemText, MenuItem, MenuList, OutlinedInput, TextField, Typography } from "@mui/material";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useNavigate, BrowserRouter, Route, Routes } from "react-router-dom";
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import ApartmentIcon from '@mui/icons-material/Apartment';
import env from '../assets/env.json'
import logoImage from '../assets/camera_icon.png'
import Image from "mui-image";
import { useEffect, useState } from "react";
import RichText from "./RichText";
import axios from 'axios'
import { maxHeight, maxWidth } from "@mui/system";
export default function Company({ user }) {
    const navigate = useNavigate()
    const [logo, setLogo] = useState(logoImage)

    const [introduce, setIntroduce] = useState(() =>
        EditorState.createEmpty()
    );

    const [data, setData] = useState({
        name: '',
        type: '',
        location: '',
        members: 0,
        foundingAt: '',
        logo: '',
        address: '',
        introduce: JSON.stringify(convertToRaw(introduce.getCurrentContent()))

    })
    const [grossType, setGrossType] = useState(false)
    const [currency, setCurrency] = useState()

    const sendCompanyData = function () {
        console.log(data)
        axios.post("/company", data)
            .then((res) => {
                console.log(res)
            })
    }
    function navigateTo(location) {
        navigate(location)
    }
    useEffect(() => {
        if (!user.isLogin && user.user.role != "rec") {
            navigateTo('/hrlogin')
        }

        // setData({
        //     ...data,
        //     introduce: JSON.stringify(convertToRaw(introduce.getCurrentContent()))
        // })
    })
    useEffect(() => {
        setData({
            ...data,
            introduce: JSON.stringify(convertToRaw(introduce.getCurrentContent()))
        })
    }, [introduce.getCurrentContent()])
    return (<>
        <Grid
            sx={{
                m: 3
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    p: 2,
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: "center",
                    background: "#fff"
                }}
            >
                <ApartmentIcon />
                <Typography variant="h5" fontWeight={550} sx={{ ml: 1 }}>
                    C???p nh???t th??ng tin c??ng ty
                </Typography>
            </Box>
            {/* head info */}
            <Grid
                container
                sx={{ p: 2, rowGap: 2, columnGap: 2, background: "#fff", mb: 2, alignItems: 'center' }}
            >
                <Grid xs={1} sx={{}}>
                    <Image
                        src={logo}
                        sx={{
                            borderRadius: '100%',
                            border: '1px solid gray'
                        }}
                        width="100px"
                        height="100px"
                        duration={0}
                        fit="scale-down"
                    ></Image>
                </Grid>
                <Grid item
                    xs={5}
                >
                    <Typography variant="p" fontWeight={500}>
                        T??n c??ng ty
                    </Typography>
                    <OutlinedInput
                        fullWidth
                        size="small"
                        sx={{ mt: 1 }}
                        placeholder="C??ng ty c??? ph???n t??i ch??nh NQA"
                        onBlur={(e) => {
                            setData({
                                ...data,
                                name: e.target.value
                            })
                        }}
                    />
                </Grid>
                <Grid item
                    xs={5}
                >
                    <Typography variant="p" fontWeight={500}>
                        L??nh v???c ho???t ?????ng
                    </Typography>
                    <Autocomplete
                        freeSolo
                        size="small"
                        sx={{ mt: 1 }}
                        options={env.REACT_APP_JOBS.split(", ")}
                        onInputChange={(e, value) => {
                            setData({
                                ...data,
                                type: value
                            })
                        }}
                        onBlur={(e) => {
                            setData({
                                ...data,
                                type: e.target.value
                            })
                        }}
                        renderInput={(params) => <TextField {...params} placeholder="Ch???n l??nh v???c ho???t ?????ng" />}
                    />
                </Grid>
                <Grid item
                    xs={12}
                >
                    <Typography variant="p" fontWeight={500}>
                        ?????a ??i???m l??m vi???c
                    </Typography>
                    <Autocomplete
                        size="small"
                        sx={{ mt: 1 }}
                        options={env.REACT_APP_LOCATION.split(", ")}
                        renderInput={(params) => <TextField {...params} placeholder="-- Ch???n ?????a ??i???m l??m vi???c --" />}
                        onInputChange={(e, value) => {
                            setData({
                                ...data,
                                location: value
                            })
                        }}
                    />
                </Grid>
            </Grid>
            {/* body info */}
            <Box
                sx={{
                    p: 2,
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: "center",
                    background: "#fff"
                }}
            >
                <InfoOutlinedIcon fontSize="small" />
                <Typography variant="p" fontWeight={500} sx={{ ml: 1 }}>
                    Th??ng tin chung
                </Typography>
            </Box>
            <Grid
                container
                sx={{ p: 2, rowGap: 1, columnGap: 2, background: "#fff", mb: 2 }}
            >
                <Grid container item xs={12} sx={{ columnGap: 2 }}>
                    <Grid item
                        xs={3}
                    >
                        <Typography variant="p" >
                            Quy m?? c??ng ty
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            size="small"
                            sx={{ mt: 1 }}
                            type="number"
                            placeholder="S??? nh??n vi??n"
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    members: e.target.value
                                })
                            }}
                        />
                    </Grid>
                    <Grid item
                        xs={3}
                    >
                        <Typography variant="p" >
                            Ng??y th??nh l???p
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            size="small"
                            sx={{ mt: 1 }}
                            type="date"
                            placeholder="S??? l?????ng c???n tuy???n"
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    foundingAt: e.target.value
                                })
                            }}
                        />
                    </Grid>
                    <Grid item
                        xs={4}
                    >
                        <Typography variant="p" >
                            Ch???n logo
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            type="file"
                            size="small"
                            sx={{ mt: 1 }}
                            onChange={(e) => {
                                // setData({
                                //     ...data,
                                //     amount: e.target.value
                                // })
                                const fileReader = new FileReader()
                                fileReader.onloadend = () => {
                                    setLogo(fileReader.result)
                                    setData({
                                        ...data,
                                        logo: fileReader.result
                                    })
                                }
                                fileReader.readAsDataURL(e.target.files[0])
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item
                    xs={12}
                >
                    <Typography variant="p" >
                        Khu v???c l??m vi???c <Typography variant="span" sx={{ color: "rgba(0,0,0,0.6)" }}>(?????a ch??? c??? th???)</Typography>
                    </Typography>
                    <OutlinedInput
                        fullWidth
                        size="small"
                        sx={{ mt: 1 }}
                        placeholder="S??? 7, Ng?? T???t T???, KDC 91B, Ph?????ng An kh??nh, Ninh Ki???u, C???n Th??"
                        onBlur={(e) => {
                            setData({
                                ...data,
                                address: e.target.value
                            })
                        }}
                    />
                </Grid>
            </Grid>
            <Box
                sx={{
                    p: 2,
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: "center",
                    background: "#fff"
                }}
            >
                <InfoOutlinedIcon fontSize="small" />
                <Typography variant="p" fontWeight={500} sx={{ ml: 1 }}>
                    Gi???i thi???u c??ng ty
                </Typography>
            </Box>
            <Grid
                container
                sx={{ p: 2, rowGap: 1, columnGap: 2, background: "#fff", mb: 2 }}
            >
                <Grid item xs={12}>
                    <RichText editorState={introduce} setEditorState={setIntroduce} />
                </Grid>
                <Button
                    sx={{ mt: 1, minWidth: 200, mr: 'auto' }}
                    size="small"
                    variant="contained"
                    onClick={() => {
                        setData({
                            ...data,
                            introduce: JSON.stringify(convertToRaw(introduce.getCurrentContent()))
                        })
                        setTimeout(() => {
                            sendCompanyData()
                        })

                    }}
                >C???p nh???t</Button>
            </Grid>
        </Grid>
    </>)
}