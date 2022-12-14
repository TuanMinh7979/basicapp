import axios from "axios";
import { useRef, useState } from "react";
import {
    Grid,
    Box,
    Typography,
    InputLabel,
    InputAdornment,
    OutlinedInput,
    Button,
    Link,
    Alert
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import Image from "mui-image";
import logo from "../assets/logo_business_white.png";
import banner from '../assets/banner_business.png'
import env from '../assets/env.json'
import { useNavigate } from "react-router-dom";
export default function HrRegister() {
    const [response, setResponse] = useState(false);
    const imageLink = env.SAMPLE_IMAGE_01;
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const retypepassword = useRef();
    const navigate = useNavigate()
    const validate = () => {
        if (
            username.current.value == "" ||
			password.current.value == "" ||
			email.current.value == "" ||
			password.current.value == "" ||
			retypepassword.current.value == ""
        ) {
            setResponse({
                showArlert: true,
                message: env.REACT_APP_NOTNULL_MESSAGE
            });
            return false;
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email.current.value)) {
            setResponse({
                showArlert: true,
                message: env.REACT_APP_WRONG_EMAIL
            });
            return false;
        } else if (retypepassword.current.value !== password.current.value) {
            setResponse({
                showArlert: true,
                message: env.REACT_APP_PASSWORD_NOT_MATCH
            });
            return false;
        }
        return true;
    };

    const Signup = () => {
        if (validate()) {
            const data = {
                usernameInp: username.current.value,
                passwordInp: password.current.value,
                email: email.current.value,
                name: "",
                address: "",
                avatar: "",
                roleInp: "rec",
               
                phone: ""
            };
            axios({
                method: "post",
                url: env.AUTH + "register",
                data: data
            }).then((res) => {
                console.log(res.data);
                
            });
        }
    };
    return (
        <>
            <Grid
                container
                sx={{
                    minHeight: "700px",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                {/* Signup control */}
                <Grid xs={5}>
                    <Box
                        sx={{
                            width: "75%",
                            mx: "auto",
                            pb: 3,
                            borderBottom: "1px solid #00000014"
                        }}
                    >
                        <Box>
                            <Image
                                sx={{
                                    maxWidth: "140px",
                                    maxHeight: "140px"
                                }}
                                src={logo}
                                fit="cover"
                                duration={0}
                            />
                        </Box>
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: "24px",
                                    fontWeight: "450"
                                }}
                            >
								Ch??o m???ng b???n ?????n v???i ViecLamNhanh,
                            </Typography>
                            <Typography
                                variant="p"
                                sx={{
                                    color: "#000000b0",
                                    fontSize: "16px"
                                }}
                            >
								T??m ki???m ???ng vi??n nhanh h??n v???i <Typography variant="p" sx={{color: '#009623', fontWeight: 'bold'}}>thu???t to??n t???i ??u</Typography>  c???a ch??ng t??i
                            </Typography>
                        </Box>
                        {response.showArlert && (
                            <Alert severity="error" sx={{ p: 0, mb: 4 }}>
                                {response.message}
                            </Alert>
                        )}
                        <form>
                            <Box sx={{ mb: 3 }}>
                                <InputLabel
                                    color="success"
                                    variant=""
                                    sx={{ fontSize: "13px", mb: 1 }}
                                >
									Username
                                </InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    inputRef={username}
                                    onFocus={() => setResponse(false)}
                                    name="username"
                                    size="small"
                                    color="success"
                                    id="input-with-icon-adornment"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <AccountCircleIcon color="success" />
                                        </InputAdornment>
                                    }
                                />
                            </Box>
                            <Box sx={{ mb: 3 }}>
                                <InputLabel
                                    color="success"
                                    variant=""
                                    sx={{ fontSize: "13px", mb: 1 }}
                                >
									Email
                                </InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    inputRef={email}
                                    onFocus={() => setResponse(false)}
                                    name="email"
                                    type="email "
                                    size="small"
                                    color="success"
                                    id="input-with-icon-adornment"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <EmailIcon color="success" />
                                        </InputAdornment>
                                    }
                                />
                            </Box>
                            <Box sx={{ mb: 3 }}>
                                <InputLabel
                                    color="success"
                                    variant=""
                                    sx={{ fontSize: "13px", mb: 1 }}
                                >
									M???t kh???u
                                </InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    inputRef={password}
                                    onFocus={() => setResponse(false)}
                                    name="password"
                                    type="password"
                                    size="small"
                                    color="success"
                                    id="input-with-icon-adornment"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <LockIcon color="success" />
                                        </InputAdornment>
                                    }
                                />
                            </Box>
                            <Box sx={{ mb: 3 }}>
                                <InputLabel
                                    color="success"
                                    variant=""
                                    sx={{ fontSize: "13px", mb: 1 }}
                                >
									Nh???p l???i M???t kh???u
                                </InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    inputRef={retypepassword}
                                    onFocus={() => setResponse(false)}
                                    name="retypepassword"
                                    type="password"
                                    size="small"
                                    color="success"
                                    id="input-with-icon-adornment"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <LockIcon color="success" />
                                        </InputAdornment>
                                    }
                                />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Button
                                    onClick={Signup}
                                    variant="contained"
                                    color="success"
                                    fullWidth
                                >
									????ng k??
                                </Button>
                                <Button
									sx={{mt:2}}
									onClick={()=>navigate("/")}
									variant="contained"
									color="error"
									fullWidth
								>
									Tho??t
								</Button>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="p">
									B???n ???? c?? t??i kho???n{" "}
                                    <Link
                                        href="/hrlogin"
                                        underline="none"
                                        sx={{ color: "#4caf50", fontWeight: "650" }}
                                    >
										????ng nh???p
                                    </Link>
                                </Typography>
                            </Box>
                        </form>
                    </Box>
                </Grid>
                {/* images */}
                <Grid
                    xs={6}
                    sx={{
                        justifyContent: "center"
                    }}
                >
                    <Box
                        sx={{
                            width: "80%",
                            mx: "auto"
                        }}
                    >
                        <Box>
                            <Image
                                sx={{
                                    maxWidth: "80%",
                                    minHeight: "80%"
                                }}
                                src={banner}
                                fit="cover"
                                duration={0}
                            ></Image>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                mt: 3,
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                        >
                            <Typography variant="h5" fontWeight={500}>
								C??ng c??? vi???t CV mi???n ph??
                            </Typography>
                            <Typography
                                variant="p"
                                sx={{ width: "70%", textAlign: "center" }}
                            >
								Nhi???u m???u CV ?????p, ph?? h???p nhu c???u ???ng tuy???n c??c v??? tr?? kh??c
								nhau. D??? d??ng ch???nh s???a th??ng tin, t???o CV online nhanh ch??ng
								trong v??ng 5 ph??t.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
