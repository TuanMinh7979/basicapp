import {
  Grid,
  Paper,
  Typography,
  Box,
  Tab,
  Tabs,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  TextField,
  Button,
  Input,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import fakedate from "../assets/fakedata.json";
import env from "../assets/env.json";
import { RichTextDisplay } from "./RichText";
import axios from "axios";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Loading from "./Loading";
import { convertLength } from "@mui/material/styles/cssUtils";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
// axios tim o day
function SearchController({ setSearchCbData }) {
  const [searchParams, setSearchParams] = useState({
    title: false,
    experience: false,
    activities: false,
    skills: false,
    education: false,
    keyword: "",
    address: "",
  });

  function handleCheck(e, item) {
    setSearchParams({
      ...searchParams,
      [item]: e.target.checked,
    });
  }

  const sendSearchOption = async () => {
    const res = await axios.post(
      "http://localhost:8800/api/resume/getByCharacterInField",
      searchParams
    );
    setSearchCbData(res.data);
  };


  return (
    <Grid
      container
      sx={{
        gap: 2,
        alignItems: "center",
        background: "#fff",
        pb: 3,
      }}
    >
      <Grid item xs={7}>
        <Typography variant="h6" color="initial">
          Ph???m vi t??m ki???m
        </Typography>
        <FormGroup>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    handleCheck(e, "title");
                  }}
                  checked={searchParams.title}
                />
              }
              label="V??? tr?? ???ng tuy???n"
            ></FormControlLabel>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    handleCheck(e, "experience");
                  }}
                  checked={searchParams.experience}
                />
              }
              label="Kinh nghi???m"
            ></FormControlLabel>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    handleCheck(e, "activities");
                  }}
                  checked={searchParams.activities}
                />
              }
              label="Ho???t ?????ng"
            ></FormControlLabel>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    handleCheck(e, "skills");
                  }}
                  checked={searchParams.skills}
                />
              }
              label="K??? n??ng"
            ></FormControlLabel>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    handleCheck(e, "education");
                  }}
                  checked={searchParams.education}
                />
              }
              label="H???c v???n"
            ></FormControlLabel>
          </Box>
        </FormGroup>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="p" fontWeight={500}>
          ?????a ??i???m l??m vi???c
        </Typography>
        <Autocomplete
          size="small"
          sx={{ mt: 1 }}
          options={env.REACT_APP_LOCATION.split(", ")}
          renderInput={(params) => (
            <TextField {...params} placeholder="-- Ch???n ?????a ??i???m l??m vi???c --" />
          )}
          onInputChange={(e, value) => {
            setSearchParams({
              ...searchParams,
              address: value,
            });
          }}
        />
      </Grid>
      <Grid item xs={7}>
        <Typography variant="h6" color="initial">
          Trong CV c?? t???n t???i t??? kh??a
        </Typography>
        <FormGroup>
          <Input
            size="small"
            onBlur={(e) => {
              setSearchParams({
                ...searchParams,
                keyword: e.target.value,
              });
            }}
          />
        </FormGroup>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => sendSearchOption()}
        >
          T??m ki???m
        </Button>
      </Grid>
    </Grid>
  );
}


// Card ung vien
function CandidateCard({ data, type }) {
 
  const commonStyle = {
    display: "flex",
    alignItems: "center",
    "& :nth-child(1)": {
      mr: 1,
    },
  };
  const navigate = useNavigate()
  return (
    <Grid
      container
      sx={{
        py: 2,
        alignItems: "center",
        justifyContent: "space-around",
        borderBottom: "1px dashed gray",
      }}
    >
      {/* thong tin chung */}
      <Grid
        item
        xs={4}
        sx={{
          borderRight: "1px solid gray",
        }}
      >
        {/*name  */}
        <Typography
          variant="h4"
          color="initial"
          fontWeight={500}
          sx={{ mb: 1 }}
        >
          {data.name}
        </Typography>
        {/* title */}
        <Box
          sx={{
            ...commonStyle,
          }}
        >
          <WorkOutlineOutlinedIcon fontSize="small" />
          <Typography variant="body1" color="initial">
            {data.title}
          </Typography>
        </Box>
        {/* address  */}
        <Box
          sx={{
            ...commonStyle,
          }}
        >
          <PlaceOutlinedIcon fontSize="small" />
          <Typography variant="body1" color="initial">
            {data.fulladdress}
          </Typography>
        </Box>
        {/* email */}
        <Box
          sx={{
            ...commonStyle,
          }}
        >
          <EmailOutlinedIcon fontSize="small" />
          <Typography variant="body1" color="initial">
            {data.email}
          </Typography>
        </Box>
        {/* phone */}
        <Box
          sx={{
            ...commonStyle,
          }}
        >
          <PhoneIphoneOutlinedIcon fontSize="small" />
          <Typography variant="body1" color="initial">
            {data.phone}
          </Typography>
        </Box>
      </Grid>
      {/* Thong tin Rich text */}
      <Grid item container xs={5}>
        {/* kinh nghiem */}
        <Grid
          item
          xs={12}
          sx={{
            mb: 2,
          }}
        >
          <Typography variant="h6" color="initial">
            Kinh nghi???m
          </Typography>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <RichTextDisplay data={JSON.parse(data.experienceCv)} />
          </Box>
        </Grid>
        {/* Hoat dong */}
        <Grid
          item
          xs={12}
          sx={{
            mb: 2,
          }}
        >
          <Typography variant="h6" color="initial">
            Ho???t ?????ng
          </Typography>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <RichTextDisplay data={JSON.parse(data.activitiesCv)} />
          </Box>
        </Grid>
        {/* Ky nang */}
        <Grid
          item
          xs={12}
          sx={{
            mb: 2,
          }}
        >
          <Typography variant="h6" color="initial">
            K??? n??ng
          </Typography>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <RichTextDisplay data={JSON.parse(data.skillsCv)} />
          </Box>
        </Grid>
        {/* Hoc van */}
        <Grid item xs={12}>
          <Typography variant="h6" color="initial">
            H???c v???n
          </Typography>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <RichTextDisplay data={JSON.parse(data.educationCv)} />
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined" color="primary" onClick={() => navigate(`/viewcv/${data._id}`)} >
          Xem CV
        </Button>
        {type == "ungtuyen" ? <Button variant="outlined" sx={{ ml: 2 }} onClick={() => navigate(`/hrhub/contacts?id=${data.contactID}`)} color="success">
          Qu???n l??
        </Button> : <Button variant="outlined" sx={{ ml: 2 }} onClick={() => navigate(`/hrhub/contacts/id=${data.contactID}`)} color="error">
          Li??n h???

        </Button>}


      </Grid>
    </Grid>
  );
}
function Result({ data, type }) {

  return (
    <>
      <Box
        sx={{
          background: "#fff",
          p: 2,
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            pb: 2,
            mb: 2,
          }}
        >
          <SearchIcon />
          {(type !== "ungtuyen") ?
            <Typography variant="h6" fontWeight={550} sx={{ ml: 1 }}>
              T??m th???y{" "}
              <Typography variant="span" color="success">
                {data.length}
              </Typography>{" "}
              ???ng vi??n ph?? h???p
            </Typography>
            :
            <Typography variant="h6" fontWeight={550} sx={{ ml: 1 }}>

              <Typography variant="span" color="success">
                {data.length}
              </Typography>{" "}
              ???ng vi??n ???ng tuy???n

            </Typography>
          }

        </Box>
        {data.map((item) => {
          return <CandidateCard data={item} type={type} />;
        })}
      </Box>
    </>
  );
}

export default function SearchCandidate({ user, env }) {
  const location = useLocation();
  const strArr = location.pathname.split("/");

  const jobPostId = strArr[strArr.length - 1];

  const { data, setData, loading, error } = useFetch(`/jobpost/${jobPostId}`)


  //cv list
  const [recommendData, setRecommendData] = useState([]);
  const [searchCbData, setSearchCbData] = useState([]);
  const [jobContacts, setJobContacts] = useState([]);

  //cv list
  const fetchJobContactsCvData = async () => {
    const jobContactsRes = await axios.get(
      `/rec/${user.user._id}/job/${jobPostId}/jobcontacts`
    );

    let contactResumes = jobContactsRes.data.map(item => {
      let resumeData = item.resumeId
      let rs = { ...resumeData, contactID: item._id }
      return rs
    })

    setJobContacts(contactResumes)

  }
  const getSugListData = async () => {
    const sugListIdFetch = await axios.get(
      `http://localhost:8000/getSugCvForJob/${jobPostId}`
    );
    let suglistIdData = sugListIdFetch.data.sugList;
    suglistIdData = suglistIdData.reverse();
    const sugListDbData = await axios.post(
      "http://localhost:8800/api/recommend/getCvByListId",
      { suglistIdData }
    );

    setRecommendData(sugListDbData.data);
  };
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>{loading ? <Loading /> : <Grid
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
        <SearchIcon />
        <Typography variant="h5" fontWeight={550} sx={{ ml: 1 }}>
          T??m ???ng vi??n cho {data.title}
        </Typography>
      </Box>
      {/* TAB */}
      <Box
        sx={{
          width: "100%",
          my: 2,
          p: 2,
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          alignItems: "center",
          background: "#fff",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="feature tabs"
          >
            <Tab label="T??m ???ng vi??n" {...a11yProps(0)} />
            <Tab label="???ng vi??n ???? ???ng tuy???n" {...a11yProps(1)} onClick={() => fetchJobContactsCvData()} />
            <Tab
              onClick={() => getSugListData()}
              label="???ng vi??n ???????c ????? xu???t b???ng AI"
              {...a11yProps(2)}
            />

          </Tabs>
        </Box>
        <TabPanel
          value={tabValue}
          index={0}
          sx={{
            background: "#f1f2f7",
          }}
        >
          <SearchController setSearchCbData={setSearchCbData} env={env} />
          {searchCbData && searchCbData.length > 0 && (
            <Result data={searchCbData} />
          )}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {jobContacts && jobContacts.length > 0 && (
            <Result data={jobContacts} type="ungtuyen" />
          )}
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          {recommendData && recommendData.length > 0 && (
            <Result data={recommendData} type="goiy" />
          )}
        </TabPanel>
      </Box>
      {/* REsult */}
    </Grid>}

    </>

  );
}
