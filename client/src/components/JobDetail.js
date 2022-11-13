import { Container, Box, TextField, FormControl, InputAdornment, InputLabel, Select, MenuItem, Button, Stack, Typography } from "@mui/material";
import env from "react-dotenv";
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BadgeIcon from '@mui/icons-material/Badge';
import Image from 'mui-image'
import logo from '../assets/companylogo_sample.png'
import { useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
export default function JobDetail() {
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 200
            }
        }
    };
    const [data, setData] = useState({
        jobTile: "Chuyên Viên Quan Hệ Khách Hàng Tại Hà Nội ",
        companyName: "RASEN GROUPS",
        jobDuration: '22/07/2024'
    })
    return (
        <>
            <Container
                disableGutters
                maxWidth
                sx={{
                    background: '#f1f2f6'
                }}
            >
                <Container
                    maxWidth="xl"
                    sx={{
                        py: 4,
                        background: 'white'
                    }}
                >
                    {/* Search Control */}
                    <Box
                        sx={{
                            width: '80%',
                            mx: 'auto',
                            display: 'flex',
                            flexWrap: 'wrap'
                        }}
                    >
                        <TextField
                            size="small"
                            color="success"
                            placeholder="Tên công việc, vị trí muốn ứng tuyển"
                            sx={{
                                flexBasis: "20%",
                                mr: 2
                            }}
                        />
                        {/* Cong viec */}
                        <FormControl
                            color="success"
                            size="small"
                            sx={{ width: "15%", mb: 1, mr: 2 }}
                        >
                            <InputLabel id="demo-simple-select-label">Ngành nghề</InputLabel>
                            <Select
                                startAdornment={
                                    <InputAdornment position="start">
                                        <WorkIcon color="success" fontSize="small" />
                                    </InputAdornment>
                                }
                                label="Ngành nghề"
                                MenuProps={MenuProps}
                            >
                                {env.JOBS.split(", ").map((item, key) => (<MenuItem value={item} key={key}>{item}</MenuItem>))}
                            </Select>
                        </FormControl>
                        {/* Noi lam viec */}
                        <FormControl
                            color="success"
                            size="small"
                            sx={{ width: "15%", mb: 1, mr: 2 }}
                        >
                            <InputLabel id="demo-simple-select-label">Địa điểm công ty</InputLabel>
                            <Select
                                startAdornment={
                                    <InputAdornment position="start">
                                        <PlaceIcon color="success" fontSize="small" />
                                    </InputAdornment>
                                }
                                label="Địa điểm công ty"
                                MenuProps={MenuProps}
                            >
                                {env.LOCATION.split(", ").map((item, key) => (<MenuItem value={item} key={key}>{item}</MenuItem>))}
                            </Select>
                        </FormControl>
                        {/* Chi tiet cong viec */}
                        <FormControl
                            color="success"
                            size="small"
                            sx={{ width: "15%", mb: 1, mr: 2 }}
                        >
                            <InputLabel id="demo-simple-select-label">Cấp bậc</InputLabel>
                            <Select
                                label="Cấp bậc"
                                MenuProps={MenuProps}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <BadgeIcon color="success" fontSize="small" />
                                    </InputAdornment>
                                }
                            >
                                {env.LEVEL.split(", ").map((item, key) => (<MenuItem value={item} key={key}>{item}</MenuItem>))}
                            </Select>
                        </FormControl>
                        {/* Muc luong */}
                        <FormControl
                            color="success"
                            size="small"
                            sx={{ width: "15%", mb: 1, mr: 2 }}
                        >
                            <InputLabel id="demo-simple-select-label">Mức lương</InputLabel>
                            <Select
                                label="Mức lương"
                                MenuProps={MenuProps}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AttachMoneyIcon color="success" fontSize="small" />
                                    </InputAdornment>
                                }
                            >
                                {env.GROSS.split(", ").map((item, key) => (<MenuItem value={item} key={key}>{item}</MenuItem>))}
                            </Select>
                        </FormControl>
                        {/* search btn */}
                        <FormControl
                        >
                            <Button
                                variant="contained"
                                color="success"
                            >Tìm việc ngay</Button>
                        </FormControl>
                    </Box>
                </Container>
                {/* Body */}
                <Container
                    maxWidth
                    disableGutters
                    sx={{
                        mt: 4,
                        background: '#f1f2f6'
                    }}
                >
                    <Stack
                        direction='row'
                        spacing={2}
                        sx={{
                            background: 'white',
                            p: 2,
                            my: 2,
                            width: '70%',
                            mx: 'auto'
                        }}

                    >
                        <Box>
                            <Image
                                sx={{
                                    maxWidth: 110,
                                    maxHeight: 110,
                                    borderRadius: "50%"
                                }}
                                src={logo}
                                duration={0}
                            ></Image>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography variant="h5" color="initial" fontWeight={600}>
                                {data.jobTile}
                            </Typography>
                            <Typography variant="h6" color="initial">
                                {data.companyName}
                            </Typography>
                            <Stack direction='row' spacing={1} sx={{color: 'rgba(0,0,0,0.7)'}}>
                                <AccessTimeIcon fontSize="small" />
                                <Typography variant="body1" >Hạn nộp hồ sơ: {data.jobDuration}</Typography>
                            </Stack>
                        </Box>
                    </Stack>
                </Container>
            </Container>
        </>
    )
}