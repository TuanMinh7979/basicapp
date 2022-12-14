import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogin, setActivatedCvId, setApplyJobs } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import {
	Grid,
	Box,
	Typography,
	InputLabel,
	InputAdornment,
	OutlinedInput,
	Button,
	Link,
	Alert,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "mui-image";
import logo from "../assets/logo_banner.png";
import env from "../assets/env.json";
import LoginSchema from "../validate/loginValidate";
import { toast } from "react-toastify";
import { isAllOf } from "@reduxjs/toolkit";
export default function Login() {
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const [response, setResponse] = useState(false);
	const imageLink = env.REACT_APP_SAMPLE_IMAGE_01;
	const username = useRef();
	const password = useRef();
	const [responseData, setResponseData] = useState();

	const Signin = () => {
		const data = {
			username: username.current.value,
			password: password.current.value,
		};
		// is validate
		LoginSchema.validate(data).then(function (data) {
			axios({
				method: "post",
				url: "auth/login",
				data: data,
			}).then((res) => {
				console.log("-----", res)
				if (res.data.status && res.data.status != 200) {

					toast.error(res.data.message)
				} else {

					res = res.data;
					sessionStorage.setItem("user", JSON.stringify(res));
					dispatch(setUserLogin(res, true));
				}
			});
		})
		// isnt validate
		LoginSchema.validate(data, { abortEarly: false }).catch((err) => {
			toast.error(err.errors.join(", "))
			console.log(err);
		})
	};

	if (user.isLogin && user.user.role == "candidate") {
		navigate("/");
	} else if (user.isLogin && user.user.role == "admin") {
		navigate("/admin");
	}
	return (
		<>
			<Grid
				container
				sx={{
					minHeight: "700px",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{/* Login control */}
				<Grid xs={5}>
					<Box
						sx={{
							width: "75%",
							mx: "auto",
							pb: 3,
							borderBottom: "1px solid #00000014",
						}}
					>
						<Box>
							<Image
								sx={{
									maxWidth: "300px",
									maxHeight: "300px",
								}}
								src={logo}
								fit="cover"
								duration={0}
							/>
						</Box>
						<Box sx={{ width: "80%", marginTop: "5%", mb: 4 }}>
							<Typography
								variant="h6"
								sx={{
									fontSize: "24px",
								}}
							>
								Ch??o m???ng b???n tr??? l???i,
							</Typography>
							<Typography
								variant="p"
								sx={{
									color: "#000000b0",
									fontSize: "16px",
								}}
							>
								H??? s?? v?? th??ng b??o tuy???n d???ng c???a b???n g??p ph???n l??m h??? th???ng c???a
								ch??ng ta th??m ph??? bi???n, h??y chung tay x??y d???ng nh??
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
									sx={{ fontSize: "13px" }}
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
									sx={{ fontSize: "13px" }}
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
							<Box sx={{ mb: 2 }}>
								<Button
									onClick={Signin}
									variant="contained"
									color="success"
									fullWidth
								>
									????ng nh???p
								</Button>
								<Button
									sx={{ mt: 1 }}
									onClick={() => navigate("/")}
									variant="contained"
									color="error"
									fullWidth
								>
									Tho??t
								</Button>
							</Box>
							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Typography variant="p">
									B???n ch??a c?? t??i kho???n{" "}
									<Link
										href="/register"
										underline="none"
										sx={{ color: "#4caf50", fontWeight: "650" }}
									>
										????ng k?? ngay
									</Link>
								</Typography>
								<Typography variant="p">
									<Link
										href="/register"
										underline="none"
										sx={{ color: "#4caf50", fontWeight: "650" }}
									>
										Qu??n m???t kh???u
									</Link>
								</Typography>
							</Box>
						</form>
					</Box>
				</Grid>
				{/* images */}
				<Grid xs={6}>
					<Box
						sx={{
							width: "70%",
						}}
					>
						<Box>
							<Image
								sx={{
									maxWidth: "70%",
									minHeight: "70%",
								}}
								src={imageLink}
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
								alignItems: "center",
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
