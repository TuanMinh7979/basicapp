import {
	Autocomplete,
	Box,
	Button,
	Grid,
	IconButton,
	InputAdornment,
	ListItemIcon,
	ListItemText,
	MenuItem,
	MenuList,
	OutlinedInput,
	TextField,
	Typography,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import {
	useNavigate,
	BrowserRouter,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ArticleIcon from "@mui/icons-material/Article";
import BarChartIcon from "@mui/icons-material/BarChart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Editor, EditorState, convertToRaw } from "draft-js";
import { useSelector } from "react-redux";
import { styled, alpha, createTheme } from "@mui/material/styles";
import "draft-js/dist/Draft.css";
import env from "../assets/env.json";
import { useEffect, useState } from "react";
import RichText from "./RichText";
import axios from "axios";
import Company from "./Company";
import Charts from "./Chart";

import { toast } from "react-toastify";
import JobDetail from "./JobDetail";
import SearchCandidate from "./SearchCandidate";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import {
	getCatIdFromName,
	getCatNameList,
	getSalaryTypeTitleList,
	getSalaryTypeIdFromTitle,
	getRankTitleList,
	getRankIdFromTitle,
	getWorkTypeTitleList,
	getWorkTypeIdFromTitle,
	getWorkExpTitleList,
	getWorkExpIdFromTitle,
	getAddressTitleList,
	getAddressIdFromTitle,
	getCatNameFromId,
	getAddressTitleFromId,
	getWorkTypeTitleFromId,
	getWorkExpTitleFromId,
	getSalaryTypeTitleFromId,
	getRankTitleFromId,
} from "./other/SelectDataUtils";
import Contact from "./Contact"

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
	"&:hover": {
		color: theme.palette.success.light,
		"& .MuiListItemIcon-root": {
			color: theme.palette.success.light,
		},
	},
}));

export function HrSideBar({ uploadJob, editCompany, viewChart, news }) {
	const theme = createTheme();
	const location = useLocation();
	const navigate = useNavigate();
	const [activeItem, setActiveItem] = useState(0);
	function navigateTo(location) {
		navigate(location);
	}
	useEffect(() => {
		switch (location.pathname) {
			case "/hrhub/":
				setActiveItem(0);
				break;
			case "/hrhub/editcompany":
				setActiveItem(1);
				break;
			case "/hrhub/charts":
				setActiveItem(2);
				break;
			default:
				break;
		}
	});
	return (
		<Box
			sx={{
				minHeight: "100%",
				background: "#fff",
			}}
		>
			<MenuList>
				<CustomMenuItem
					sx={{
						color: activeItem == 0 ? theme.palette.success.main : "",
					}}
					onClick={() => {
						navigateTo("./");
					}}
				>
					<ListItemIcon sx={{ py: 2 }}>
						<EditIcon
							fontSize="small"
							sx={{
								color: activeItem == 0 ? theme.palette.success.main : "",
							}}
						/>
					</ListItemIcon>
					<ListItemText>????ng tin tuy???n d???ng m???i</ListItemText>
				</CustomMenuItem>
				<CustomMenuItem
					sx={{
						color: activeItem == 1 ? theme.palette.success.main : "",
					}}
					onClick={() => {
						navigateTo("./editcompany");
					}}
				>
					<ListItemIcon sx={{ py: 2 }}>
						<ApartmentIcon
							fontSize="small"
							sx={{
								color: activeItem == 1 ? theme.palette.success.main : "",
							}}
						/>
					</ListItemIcon>
					<ListItemText>C???p nh???t th??ng tin c??ng ty</ListItemText>
				</CustomMenuItem>
				<CustomMenuItem
					sx={{
						color: activeItem == 2 ? theme.palette.success.main : "",
					}}
					onClick={() => {
						navigateTo("./charts");
					}}
				>
					<ListItemIcon sx={{ py: 2 }}>
						<BarChartIcon
							fontSize="small"
							sx={{
								color: activeItem == 2 ? theme.palette.success.main : "",
							}}
						/>
					</ListItemIcon>
					<ListItemText>B??o c??o tuy???n d???ng</ListItemText>
				</CustomMenuItem>
				<CustomMenuItem
					sx={{
						color: activeItem == 3 ? theme.palette.success.main : "",
					}}
					onClick={() => {
						navigateTo("./contacts");
					}}
				>
					<ListItemIcon sx={{ py: 2 }}>
						<ArticleIcon
							fontSize="small"
							sx={{
								color: activeItem == 3 ? theme.palette.success.main : "",
							}}
						/>
					</ListItemIcon>
					<ListItemText>Qu???n l?? ???ng tuy???n</ListItemText>
				</CustomMenuItem>
			</MenuList>
		</Box>
	);
}

function JobPost({ user }) {
	const navigate = useNavigate();
	const [description, setDescription] = useState(() =>
		EditorState.createEmpty()
	);
	const [candidateRequired, setCandidateRequired] = useState(() =>
		EditorState.createEmpty()
	);
	const [benefit, setBenefit] = useState(() => EditorState.createEmpty());
	const [data, setData] = useState({
		title: "",

		categoryId: "",
		locationId: "",
		amount: 0,
		workTypeId: "",
		endDate: "",
		gender: "",
		rankId: "",
		workExpId: "",
		currency: "",
		salaryTypeId: "",

		salaryMax: 0,
		salaryMin: 0,
		fullAddress: "",
		description: JSON.stringify(convertToRaw(description.getCurrentContent())),
		candidateRequired: JSON.stringify(
			convertToRaw(candidateRequired.getCurrentContent())
		),
		benefit: JSON.stringify(convertToRaw(benefit.getCurrentContent())),
	});
	useEffect(() => {
		setData({
			...data,
			description: JSON.stringify(
				convertToRaw(description.getCurrentContent())
			),
			candidateRequired: JSON.stringify(
				convertToRaw(candidateRequired.getCurrentContent())
			),
			benefit: JSON.stringify(convertToRaw(benefit.getCurrentContent())),
		});
	}, [
		description.getCurrentContent(),
		candidateRequired.getCurrentContent(),
		benefit.getCurrentContent(),
	]);
	const [salaryType, setSalaryType] = useState(false);
	const [currency, setCurrency] = useState();
	// Ham nay de lay text tu richtext
	const getTextArrayFromRich = function (rawdata) {
		if (rawdata.blocks.length > 0) {
			return rawdata.blocks.map((item) => item.text);
		}
	};

	const sendPostData = async function () {
		console.log(JSON.stringify(convertToRaw(benefit.getCurrentContent())));
		let descriptionText = getTextArrayFromRich(
			convertToRaw(description.getCurrentContent())
		).join(" ");
		let candidateRequiredText = getTextArrayFromRich(
			convertToRaw(candidateRequired.getCurrentContent())
		).join(" ");
		console.log({ ...data, descriptionText, candidateRequiredText });
		const res = await axios.post("/jobpost", {
			...data,
			descriptionText,
			candidateRequiredText,
		});
		if (res.data && res.data.status && res.data.status !== 200) {
			console.log(res);
			toast.warning("T???o job post th???t b???i");
		} else {
			toast.success("T???o job post th??nh c??ng");
		}
	};
	function navigateTo(location) {
		navigate(location);
	}
	useEffect(() => {
		if (!user.isLogin && user.user.role != "rec") {
			navigateTo("/hrlogin");
		}
	});
	return (
		<>
			<Grid
				sx={{
					m: 3,
				}}
			>
				{/* Header */}
				<Box
					sx={{
						p: 2,
						borderBottom: "1px solid rgba(0,0,0,0.1)",
						display: "flex",
						alignItems: "center",
						background: "#fff",
					}}
				>
					<EditIcon />
					<Typography variant="h5" fontWeight={550} sx={{ ml: 1 }}>
						????ng tin tuy???n d???ng m???i
					</Typography>
				</Box>
				{/* head info */}
				<Grid
					container
					sx={{ p: 2, rowGap: 1, columnGap: 2, background: "#fff", mb: 2 }}
				>
					<Grid item xs={5}>
						<Typography variant="p" fontWeight={500}>
							V??? tr?? tuy???n d???ng
						</Typography>
						<OutlinedInput
							fullWidth
							size="small"
							sx={{ mt: 1 }}
							placeholder="Thi???t k??? ????? h???a b??n th???i gian"
							onBlur={(e) => {
								setData({
									...data,
									title: e.target.value,
								});
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<Typography variant="p" fontWeight={500}>
							Ng??nh ngh???
						</Typography>
						<Autocomplete
							freeSolo
							size="small"
							sx={{ mt: 1 }}
							options={getCatNameList()}
							onInputChange={(e, value) => {
								setData({
									...data,
									categoryId: getCatIdFromName(e.target.value),
								});
							}}
							onBlur={(e) => {
								setData({
									...data,
									categoryId: getCatIdFromName(e.target.value),
								});
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="Ch???n v??? tr?? c??ng vi???c c???n tuy???n"
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="p" fontWeight={500}>
							?????a ??i???m l??m vi???c
						</Typography>
						<Autocomplete
							size="small"
							sx={{ mt: 1 }}
							options={getAddressTitleList()}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="-- Ch???n ?????a ??i???m l??m vi???c --"
								/>
							)}
							onInputChange={(e, value) => {
								setData({
									...data,
									locationId: getAddressIdFromTitle(value),
								});
							}}
						/>
					</Grid>
				</Grid>
				{/* body info */}
				<Box
					sx={{
						p: 2,
						borderBottom: "1px solid rgba(0,0,0,0.1)",
						display: "flex",
						alignItems: "center",
						background: "#fff",
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
						<Grid item xs={3}>
							<Typography variant="p">S??? l?????ng tuy???n</Typography>
							<OutlinedInput
								fullWidth
								size="small"
								sx={{ mt: 1 }}
								type="number"
								placeholder="S??? l?????ng c???n tuy???n"
								onChange={(e) => {
									setData({
										...data,
										amount: e.target.value,
									});
								}}
							/>
						</Grid>
						<Grid item xs={3}>
							<Typography variant="p">H??nh th???c l??m vi???c</Typography>
							<Autocomplete
								size="small"
								sx={{ mt: 1 }}
								options={getWorkTypeTitleList()}
								renderInput={(params) => (
									<TextField
										{...params}
										placeholder="-- Ch???n h??nh th???c l??m vi???c --"
									/>
								)}
								onInputChange={(e, value) => {
									setData({
										...data,
										workTypeId: getWorkTypeIdFromTitle(value),
									});
								}}
								onBlur={(e) => {
									setData({
										...data,
										workTypeId: getWorkTypeIdFromTitle(value),
									});
								}}
							/>
						</Grid>
						<Grid item xs={3}>
							<Typography variant="p">Th???i h???n tuy???n</Typography>
							<OutlinedInput
								fullWidth
								size="small"
								sx={{ mt: 1 }}
								type="date"
								placeholder=""
								onChange={(e) => {
									setData({
										...data,
										endDate: e.target.value,
									});
								}}
							/>
						</Grid>
					</Grid>
					<Grid container item xs={12} sx={{ columnGap: 2 }}>
						<Grid item xs={3}>
							<Typography variant="p">Gi???i t??nh</Typography>
							<Autocomplete
								size="small"
								sx={{ mt: 1 }}
								options={env.REACT_APP_SEXS.split(", ")}
								renderInput={(params) => (
									<TextField {...params} placeholder="-- Ch???n gi???i t??nh --" />
								)}
								onInputChange={(e, value) => {
									setData({
										...data,
										gender: value,
									});
								}}
							/>
						</Grid>
						<Grid item xs={3}>
							<Typography variant="p">C???p b???c</Typography>
							<Autocomplete
								freeSolo
								size="small"
								sx={{ mt: 1 }}
								options={getRankTitleList()}
								renderInput={(params) => (
									<TextField {...params} placeholder="Gi??m ?????c kinh doanh" />
								)}
								onInputChange={(e, value) => {
									setData({
										...data,
										rankId: getRankIdFromTitle(value),
									});
								}}
								onBlur={(e) => {
									setData({
										...data,
										rankId: getRankIdFromTitle(e.target.value),
									});
								}}
							/>
						</Grid>
						<Grid item xs={3}>
							<Typography variant="p">Kinh nghi???m l??m vi???c</Typography>
							<Autocomplete
								freeSolo
								size="small"
								sx={{ mt: 1 }}
								options={getWorkExpTitleList()}
								renderInput={(params) => (
									<TextField {...params} placeholder="Kinh nghi???m l??m vi???c" />
								)}
								onInputChange={(e, value) => {
									setData({
										...data,
										workExpId: getWorkExpIdFromTitle(value),
									});
								}}
								onBlur={(e) => {
									setData({
										...data,
										workExpId: getWorkExpIdFromTitle(e.target.value),
									});
								}}
							/>
						</Grid>
					</Grid>
					<Grid container item xs={12} sx={{ columnGap: 2 }}>
						<Grid item xs={3}>
							<Typography variant="p">Lo???i ti???n l????ng</Typography>
							<Autocomplete
								size="small"
								sx={{ mt: 1 }}
								options={env.REACT_APP_CURRENCY.split(", ")}
								onInputChange={(e, value) => {
									setCurrency(value);
									setData({
										...data,
										currency: value,
									});
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										placeholder="-- Ch???n lo???i ti???n l????ng --"
									/>
								)}
							/>
						</Grid>
						<Grid item xs={3}>
							<Typography variant="p">Ki???u l????ng</Typography>
							<Autocomplete
								size="small"
								sx={{ mt: 1 }}
								options={getSalaryTypeTitleList()}
								onInputChange={(e, value) => {
									setSalaryType(value);
									setData({
										...data,
										salaryTypeId: getSalaryTypeIdFromTitle(value),
									});
								}}
								renderInput={(params) => (
									<TextField {...params} placeholder="-- Ch???n ki???u l????ng" />
								)}
							/>
						</Grid>
						{/* L????ng theo kho???ng */}
						{salaryType == "Trong kho???ng" && (
							<>
								<Grid item xs={2}>
									<Typography variant="p">T???</Typography>
									<OutlinedInput
										fullWidth
										size="small"
										sx={{ mt: 1 }}
										type="number"
										endAdornment={
											<InputAdornment position="end">{currency}</InputAdornment>
										}
										onBlur={(e) => {
											setData({
												...data,
												salaryMin: e.target.value,
											});
										}}
									/>
								</Grid>
								<Grid item xs={2}>
									<Typography variant="p">?????n</Typography>
									<OutlinedInput
										fullWidth
										size="small"
										sx={{ mt: 1 }}
										type="number"
										endAdornment={
											<InputAdornment position="end">{currency}</InputAdornment>
										}
										onBlur={(e) => {
											setData({
												...data,
												salaryMax: e.target.value,
											});
										}}
									/>
								</Grid>
							</>
						)}
						{/* L????ng c??? ?????nh */}
						{salaryType == "C??? ?????nh" && (
							<>
								<Grid item xs={3}>
									<Typography variant="p">L????ng</Typography>
									<OutlinedInput
										fullWidth
										size="small"
										sx={{ mt: 1 }}
										type="number"
										endAdornment={
											<InputAdornment position="end">{currency}</InputAdornment>
										}
										onBlur={(e) => {
											setData({
												...data,
												salaryMax: e.target.value,
												salaryMin: e.target.value,
											});
										}}
									/>
								</Grid>
							</>
						)}
					</Grid>
					<Grid item xs={12}>
						<Typography variant="p">
							Khu v???c l??m vi???c{" "}
							<Typography variant="span" sx={{ color: "rgba(0,0,0,0.6)" }}>
								(?????a ch??? c??? th???)
							</Typography>
						</Typography>
						<OutlinedInput
							fullWidth
							size="small"
							sx={{ mt: 1 }}
							placeholder="S??? 7, Ng?? T???t T???, KDC 91B, Ph?????ng An kh??nh, Ninh Ki???u, C???n Th??"
							onBlur={(e) => {
								setData({
									...data,
									fullAddress: e.target.value,
								});
							}}
						/>
					</Grid>
				</Grid>
				<Box
					sx={{
						p: 2,
						borderBottom: "1px solid rgba(0,0,0,0.1)",
						display: "flex",
						alignItems: "center",
						background: "#fff",
					}}
				>
					<InfoOutlinedIcon fontSize="small" />
					<Typography variant="p" fontWeight={500} sx={{ ml: 1 }}>
						Th??ng tin chi ti???t
					</Typography>
				</Box>
				<Grid
					container
					sx={{ p: 2, rowGap: 1, columnGap: 2, background: "#fff", mb: 2 }}
				>
					<Grid item xs={12}>
						<Typography variant="p">M?? t??? c??ng vi???c</Typography>
						<RichText
							editorState={description}
							setEditorState={setDescription}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="p">Y??u c???u ???ng vi??n</Typography>
						<RichText
							editorState={candidateRequired}
							setEditorState={setCandidateRequired}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="p">Quy???n l???i</Typography>
						<RichText editorState={benefit} setEditorState={setBenefit} />
					</Grid>
					<Grid item xs={12}>
						<Typography variant="p">K??? n??ng c???n c??</Typography>
						<OutlinedInput
							size="small"
							fullWidth
							sx={{ mt: 1 }}
							placeholder="VD: K??? n??ng photoshop, Word, Excel, ..."
						/>
					</Grid>
					<Button
						sx={{ mt: 1, minWidth: 200, mr: "auto" }}
						size="small"
						variant="contained"
						onClick={() => {
							sendPostData();
						}}
					>
						????ng tin
					</Button>
				</Grid>
			</Grid>
		</>
	);
}

function EditJobPost({ user }) {
	const navigate = useNavigate();
	const location = useLocation();
	const id =
		location.pathname.split("/")[location.pathname.split("/").length - 1];

	const { data, setData, loading, error } = useFetch(`/jobpost/${id}`);

	const [description, setDescription] = useState(() =>
		EditorState.createEmpty()
	);
	const [candidateRequired, setCandidateRequired] = useState(() =>
		EditorState.createEmpty()
	);
	const [benefit, setBenefit] = useState(() => EditorState.createEmpty());

	const [salaryType, setSalaryType] = useState(false);
	const [currency, setCurrency] = useState();

	const getTextArrayFromRich = function (rawdata) {
		if (rawdata.blocks.length > 0) {
			return rawdata.blocks.map((item) => item.text);
		}
	};

	const sendPostData = async function () {
		let descriptionText = getTextArrayFromRich(
			convertToRaw(description.getCurrentContent())
		).join(" ");
		let candidateRequiredText = getTextArrayFromRich(
			convertToRaw(candidateRequired.getCurrentContent())
		).join(" ");

		const res = await axios.post("/jobpost", {
			...data,
			description: JSON.stringify(
				convertToRaw(description.getCurrentContent())
			),
			candidateRequired: JSON.stringify(
				convertToRaw(candidateRequired.getCurrentContent())
			),
			benefit: JSON.stringify(convertToRaw(benefit.getCurrentContent())),

			descriptionText,
			candidateRequiredText,
		});

		if (res.data && res.data.status && res.data.status !== 200) {
			console.log(res);
			toast.warning("C???p nh???t jobpost th???t b???i");
		} else {
			toast.success("C???p nh???t jobpost th??nh c??ng");
		}
	};
	function navigateTo(location) {
		navigate(location);
	}

	useEffect(() => {
		if (!user.isLogin && user.user.role != "rec") {
			navigateTo("/hrlogin");
		}
	});
	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Grid
					sx={{
						m: 3,
					}}
				>
					{/* Header */}
					<Box
						sx={{
							p: 2,
							borderBottom: "1px solid rgba(0,0,0,0.1)",
							display: "flex",
							alignItems: "center",
							background: "#fff",
						}}
					>
						<EditIcon />
						<Typography variant="h5" fontWeight={550} sx={{ ml: 1 }}>
							C???p nh???t tin tuy???n d???ng
						</Typography>
					</Box>
					{/* head info */}
					<Grid
						container
						sx={{ p: 2, rowGap: 1, columnGap: 2, background: "#fff", mb: 2 }}
					>
						<Grid item xs={5}>
							<Typography variant="p" fontWeight={500}>
								V??? tr?? tuy???n d???ng
							</Typography>
							<OutlinedInput
								fullWidth
								size="small"
								sx={{ mt: 1 }}
								value={data.title}
								placeholder="Thi???t k??? ????? h???a b??n th???i gian"
								onBlur={(e) => {
									setData({
										...data,
										title: e.target.value,
									});
								}}
							/>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="p" fontWeight={500}>
								Ng??nh ngh???
							</Typography>
							<Autocomplete
								value={getCatNameFromId(data.categoryId)}
								freeSolo
								size="small"
								sx={{ mt: 1 }}
								options={getCatNameList()}
								onInputChange={(e, value) => {
									setData({
										...data,
										categoryId: getCatIdFromName(value),
									});
								}}
								onBlur={(e) => {
									setData({
										...data,
										categoryId: getCatIdFromName(e.target.value),
									});
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										placeholder="Ch???n v??? tr?? c??ng vi???c c???n tuy???n"
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="p" fontWeight={500}>
								?????a ??i???m l??m vi???c
							</Typography>
							<Autocomplete
								value={getAddressTitleFromId(data.locationId)}
								size="small"
								sx={{ mt: 1 }}
								options={getAddressTitleList()}
								renderInput={(params) => (
									<TextField
										{...params}
										placeholder="-- Ch???n ?????a ??i???m l??m vi???c --"
									/>
								)}
								onInputChange={(e, value) => {
									setData({
										...data,
										locationId: getAddressIdFromTitle(value),
									});
								}}
							/>
						</Grid>
					</Grid>
					{/* body info */}
					<Box
						sx={{
							p: 2,
							borderBottom: "1px solid rgba(0,0,0,0.1)",
							display: "flex",
							alignItems: "center",
							background: "#fff",
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
							<Grid item xs={3}>
								<Typography variant="p">S??? l?????ng tuy???n</Typography>
								<OutlinedInput
									value={data.amount}
									fullWidth
									size="small"
									sx={{ mt: 1 }}
									type="number"
									placeholder="S??? l?????ng c???n tuy???n"
									onChange={(e) => {
										setData({
											...data,
											amount: e.target.value,
										});
									}}
								/>
							</Grid>
							<Grid item xs={3}>
								<Typography variant="p">H??nh th???c l??m vi???c</Typography>
								<Autocomplete
									value={getWorkTypeTitleFromId(data.workTypeId)}
									size="small"
									sx={{ mt: 1 }}
									options={getWorkTypeTitleList()}
									renderInput={(params) => (
										<TextField
											{...params}
											placeholder="-- Ch???n h??nh th???c l??m vi???c --"
										/>
									)}
									onInputChange={(e, value) => {
										setData({
											...data,
											workTypeId: getWorkTypeIdFromTitle(value),
										});
									}}
									onBlur={(e) => {
										setData({
											...data,
											workTypeId: getWorkTypeIdFromTitle(value),
										});
									}}
								/>
							</Grid>
							<Grid item xs={3}>
								<Typography variant="p">Th???i h???n tuy???n</Typography>
								<OutlinedInput
									value={data.endDate}
									fullWidth
									size="small"
									sx={{ mt: 1 }}
									type="date"
									placeholder=""
									onChange={(e) => {
										setData({
											...data,
											endDate: e.target.value,
										});
									}}
								/>
							</Grid>
						</Grid>
						<Grid container item xs={12} sx={{ columnGap: 2 }}>
							<Grid item xs={3}>
								<Typography variant="p">Gi???i t??nh</Typography>
								<Autocomplete
									value={data.gender}
									size="small"
									sx={{ mt: 1 }}
									options={env.REACT_APP_SEXS.split(", ")}
									renderInput={(params) => (
										<TextField {...params} placeholder="-- Ch???n gi???i t??nh --" />
									)}
									onInputChange={(e, value) => {
										setData({
											...data,
											gender: value,
										});
									}}
								/>
							</Grid>
							<Grid item xs={3}>
								<Typography variant="p">C???p b???c</Typography>
								<Autocomplete
									value={getRankTitleFromId(data.rankId)}
									freeSolo
									size="small"
									sx={{ mt: 1 }}
									options={getRankTitleList()}
									renderInput={(params) => (
										<TextField {...params} placeholder="Gi??m ?????c kinh doanh" />
									)}
									onInputChange={(e, value) => {
										setData({
											...data,
											rankId: getRankIdFromTitle(value),
										});
									}}
									onBlur={(e) => {
										setData({
											...data,
											rankId: getRankIdFromTitle(e.target.value),
										});
									}}
								/>
							</Grid>
							<Grid item xs={3}>
								<Typography variant="p">Kinh nghi???m l??m vi???c</Typography>
								<Autocomplete
									value={getWorkExpTitleFromId(data.workExpId)}
									freeSolo
									size="small"
									sx={{ mt: 1 }}
									options={getWorkExpTitleList()}
									renderInput={(params) => (
										<TextField {...params} placeholder="Kinh nghi???m l??m vi???c" />
									)}
									onInputChange={(e, value) => {
										setData({
											...data,
											workExpId: getWorkExpIdFromTitle(value),
										});
									}}
									onBlur={(e) => {
										setData({
											...data,
											workExpId: getWorkExpIdFromTitle(e.target.value),
										});
									}}
								/>
							</Grid>
						</Grid>
						<Grid container item xs={12} sx={{ columnGap: 2 }}>
							<Grid item xs={3}>
								<Typography variant="p">Lo???i ti???n l????ng</Typography>
								<Autocomplete
									value={data.currency}
									size="small"
									sx={{ mt: 1 }}
									options={env.REACT_APP_CURRENCY.split(", ")}
									onInputChange={(e, value) => {
										setCurrency(value);
										setData({
											...data,
											currency: value,
										});
									}}
									renderInput={(params) => (
										<TextField
											{...params}
											placeholder="-- Ch???n lo???i ti???n l????ng --"
										/>
									)}
								/>
							</Grid>
							<Grid item xs={3}>
								<Typography variant="p">Ki???u l????ng</Typography>
								<Autocomplete
									value={getSalaryTypeTitleFromId(data.salaryTypeId)}
									size="small"
									sx={{ mt: 1 }}
									options={getSalaryTypeTitleList()}
									onInputChange={(e, value) => {
										setSalaryType(value);
										setData({
											...data,
											salaryTypeId: getSalaryTypeIdFromTitle(value),
										});
									}}
									renderInput={(params) => (
										<TextField {...params} placeholder="-- Ch???n ki???u l????ng" />
									)}
								/>
							</Grid>
							{/* L????ng theo kho???ng */}
							{salaryType == "Trong kho???ng" && (
								<>
									<Grid item xs={2}>
										<Typography variant="p">T???</Typography>
										<OutlinedInput
											value={data.salaryMin !== 0 ? data.salaryMin : ""}
											fullWidth
											size="small"
											sx={{ mt: 1 }}
											type="number"
											endAdornment={
												<InputAdornment position="end">
													{currency}
												</InputAdornment>
											}
											onBlur={(e) => {
												setData({
													...data,
													salaryMin: e.target.value,
												});
											}}
										/>
									</Grid>
									<Grid item xs={2}>
										<Typography variant="p">?????n</Typography>
										<OutlinedInput
											value={data.salaryMax !== 999999999 ? data.salaryMax : ""}
											fullWidth
											size="small"
											sx={{ mt: 1 }}
											type="number"
											endAdornment={
												<InputAdornment position="end">
													{currency}
												</InputAdornment>
											}
											onBlur={(e) => {
												setData({
													...data,
													salaryMax: e.target.value,
												});
											}}
										/>
									</Grid>
								</>
							)}
							{/* L????ng c??? ?????nh */}
							{salaryType == "C??? ?????nh" && (
								<>
									<Grid item xs={3}>
										<Typography variant="p">L????ng</Typography>
										<OutlinedInput
											value={data.salaryMin}
											fullWidth
											size="small"
											sx={{ mt: 1 }}
											type="number"
											endAdornment={
												<InputAdornment position="end">
													{currency}
												</InputAdornment>
											}
											onBlur={(e) => {
												setData({
													...data,
													salaryMax: e.target.value,
													salaryMin: e.target.value,
												});
											}}
										/>
									</Grid>
								</>
							)}
						</Grid>
						<Grid item xs={12}>
							<Typography variant="p">
								Khu v???c l??m vi???c{" "}
								<Typography variant="span" sx={{ color: "rgba(0,0,0,0.6)" }}>
									(?????a ch??? c??? th???)
								</Typography>
							</Typography>
							<OutlinedInput
								value={data.fullAddress}
								fullWidth
								size="small"
								sx={{ mt: 1 }}
								placeholder="S??? 7, Ng?? T???t T???, KDC 91B, Ph?????ng An kh??nh, Ninh Ki???u, C???n Th??"
								onBlur={(e) => {
									setData({
										...data,
										fullAddress: e.target.value,
									});
								}}
							/>
						</Grid>
					</Grid>
					<Box
						sx={{
							p: 2,
							borderBottom: "1px solid rgba(0,0,0,0.1)",
							display: "flex",
							alignItems: "center",
							background: "#fff",
						}}
					>
						<InfoOutlinedIcon fontSize="small" />
						<Typography variant="p" fontWeight={500} sx={{ ml: 1 }}>
							Th??ng tin chi ti???t
						</Typography>
					</Box>
					<Grid
						container
						sx={{ p: 2, rowGap: 1, columnGap: 2, background: "#fff", mb: 2 }}
					>
						<Grid item xs={12}>
							<Typography variant="p">M?? t??? c??ng vi???c</Typography>
							<RichText
								editorState={description}
								setEditorState={setDescription}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="p">Y??u c???u ???ng vi??n</Typography>
							<RichText
								editorState={candidateRequired}
								setEditorState={setCandidateRequired}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="p">Quy???n l???i</Typography>
							<RichText editorState={benefit} setEditorState={setBenefit} />
						</Grid>
						<Grid item xs={12}>
							<Typography variant="p">K??? n??ng c???n c??</Typography>
							<OutlinedInput
								size="small"
								fullWidth
								sx={{ mt: 1 }}
								placeholder="VD: K??? n??ng photoshop, Word, Excel, ..."
							/>
						</Grid>
						<Button
							sx={{ mt: 1, minWidth: 200, mr: "auto" }}
							size="small"
							variant="contained"
							onClick={() => {
								sendPostData();
							}}
						>
							L??u thay ?????i
						</Button>
					</Grid>
				</Grid>
			)}
		</>
	);
}
export default function HrHub() {
	const navigate = useNavigate();
	function navigateTo(location) {
		navigate(location);
	}
	const user = useSelector((state) => state.user);
	useEffect(() => {
		if (user.user.role != "rec") {
			navigateTo("/hrlogin");
		}
	});
	return (
		<>
			<Grid container sx={{ background: "#f1f2f6" }}>
				<Grid item xs={2}>
					<HrSideBar
						name={user.user.username}
						companyName="Ch??a c???p nh???t c??ng ty"
					/>
				</Grid>
				<Grid item xs={10}>
					<Routes>
						<Route path="/" element={<JobPost user={user} />}></Route>
						<Route
							path="/editjobpost/:id"
							element={<EditJobPost user={user} />}
						></Route>
						<Route path="/editcompany" element={<Company user={user} />} />
						<Route path="/charts" element={<Charts user={user} />} />
						<Route path="/jobdetail" element={<JobDetail />} />
						<Route
							path="/searchcandidate/:id"
							element={<SearchCandidate user={user} />}
						/>
						<Route path="/contacts" element={<Contact user={user} />}></Route>
					</Routes>
				</Grid>
			</Grid>
		</>
	);
}
