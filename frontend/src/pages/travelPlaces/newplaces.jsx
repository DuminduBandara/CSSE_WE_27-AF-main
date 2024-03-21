import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { FormLabel } from '@mui/material';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Kandy',
  'Nuwara Eliya',
  'Matale',
  'Kurunegala',
  'Puttalam',
  'Colombo',
  'Gampaha',
  'Kalutara',
  'Galle',
  'Matara',
  'Hambantota',
    'Anuradhapura',
    'Polonnaruwa',
    'Badulla',
    'Monaragala',
    'Rathnapura',
    'Kegalle',
    'Jaffna',
    'Mannar',
    'Vavuniya',
    'Mullaitivu',
    'Batticaloa',
    'Ampara',
    'Trincomalee',
    'Kilinochchi',

];

const provinces = [
  {
    name: 'Central Province',
    districts: ['Kandy ' , 'Matale', 'Nuwara Eliya'],
  },
  {
    name: 'North Western Province',
    districts: ['Kurunegala', 'Puttalam'],
  },
  {
    name: 'Western Province',
    districts: ['Colombo', 'Gampaha', 'Kalutara'],
  },
  {
    name: 'Eastern Province',
    districts: ['Ampara', 'Batticaloa', 'Trincomalee'],
  },
  {
    name: 'Southern Province',
    districts: ['Galle', 'Matara', 'Hambantota'],
  },
  {
    name: 'Uva Province',
    districts: ['Badulla', 'Monaragala'],
  },
  {
    name: 'Sabaragamuwa Province',
    districts: ['Kegalle', 'Rathnapura'],
  },
  {
    name: 'North Central Province',
    districts: ['Anuradhapura', 'Polonnaruwa'],
  },
  {
    name: 'Northern Province',
    districts: ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'],
  },


];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }


export default function NewPlaces() {

  //get user details
  const [userDetails, setUserDetails] = useState({});
  const uid = localStorage.getItem("username");

  const loadUserData = async () => {
    axios({
      method: "post",
      url: "http://localhost:8080/api/get-user-details",
      data: {
        username: uid,
      },
    }).then((data) => {
      console.log(data.data);
      setUserDetails(data.data);
    });
  };

  useEffect(() => {
    loadUserData();
  }, []);

    const [province, setProvince] = React.useState('');
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
  const [value, setValue] = React.useState(dayjs('2023-05-07T21:11:54'));
  const districts = provinces.find((p) => p.name === province)?.districts || [];
  const [days, setDays] = React.useState('');

  //set form data
  // const [formData, setFormData] = React.useState({
  //   province: '',
  //   districts: [],
  //   date: '',
  //   days: '',
  // });

  // const { date, days } = formData;


  const handleChange = (event) => {
    
    const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
  };


  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };
  const handleDateChange = (newValue) => {
    setValue(newValue);
  };
  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };
  
  
// const handleSubmit = () => {
//     // Prepare the form data
//     const formData = {
//       province,
//       districts: personName,
//       date: value.format('YYYY-MM-DD'),
//       // days: parseInt(days, 10),
//     };

//     axios
//       .post("http://localhost:8080/requests/add", formData)
//       .then((response) => {
//         // Handle the successful response
//         console.log(response.data); // You can customize this based on your requirements
//         alert("Request Added");
//       })
//       .catch((error) => {
//         // Handle the error
//         console.error('Error:', error);
//       });
//   };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = {
      userid: userDetails.id,
      province,
      districts: personName,
      date: value.format('YYYY-MM-DD'),
      days
     }
    // Send a POST request
    await axios.post("http://localhost:8080/requests/add", response)
    .then(res => {
      console.log(response);
      // alert("Request Added");
      Swal.fire("Done!", "Request added successfully...", "success").then(
        () => {
          window.location.href = "/";
        }
      );
  })
  .catch(err => {
      console.log(err);
      alert("Can't add Request");
  });

  } catch (error) {
    console.log("Error:", error);
  }
};
  

  return (
    <div>

    <Form onSubmit={handleSubmit}>
    <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-3">
        <Form.Label>Select Province</Form.Label>
        <input type="hidden" name="userId" value={userDetails.id} />
            <Box sx={{  m: 1,width: 570,marginBottom:4,marginLeft:0 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Province</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={province}
                    label="Province"
                    onChange={handleProvinceChange}
                    >
                    {/* <MenuItem value={10}>Central Province</MenuItem>
                    <MenuItem value={20}>North Western Province</MenuItem>
                    <MenuItem value={30}>Western Province</MenuItem>
                    <MenuItem value={40}>Eastern Province</MenuItem>
                    <MenuItem value={50}>Uva Province</MenuItem>
                    <MenuItem value={60}>Southern Province</MenuItem>
                    <MenuItem value={70}>Sabaragamuwa Province</MenuItem>
                    <MenuItem value={80}>North Central Province</MenuItem>
                    <MenuItem value={90}>Northern Province</MenuItem> */}

                      <MenuItem value="">Select Province</MenuItem>
                      {provinces.map((p) => (
                        <MenuItem key={p.name} value={p.name}>
                          {p.name}
                        </MenuItem>
                      ))}
                    
                    </Select>
                </FormControl>
            </Box>
        </div>

        {/* <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-3">
        <Form.Label>Select Districts</Form.Label>
                <FormControl sx={{ m: 1, width: 570, marginBottom:5,marginLeft:0 }}>
                <InputLabel id="demo-multiple-chip-label">District</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    onDelete={handleDelete}
                    input={<OutlinedInput id="select-multiple-chip" label="District" />}
                    renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                        <Chip key={value} label={value} />
                        ))}
                    </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        // style={getStyles(name, personName, theme)}
                    >
                        {name}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
        </div> */}
{province && (
<div class="col-md-8 col-lg-6 col-xl-4 offset-xl-3">
        <Form.Label>Select Districts</Form.Label>
        <FormControl sx={{ m: 1, width: 570, marginBottom:5,marginLeft:0 }}>
        <InputLabel id="demo-multiple-checkbox-label">District</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="District" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names
            .filter((name) => districts.includes(name))
            .map((name) => (
        <MenuItem key={name} value={name}>
          <Checkbox checked={personName.indexOf(name) > -1} />
          <ListItemText primary={name} />
        </MenuItem>
      ))}
        </Select>
      </FormControl>
    </div>
)}



        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-3">
        <Form.Label>Select a start date</Form.Label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                    <DesktopDatePicker Style={{width:900, marginBottom:5}}
                    label="Date"
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
                    </Stack>
                </LocalizationProvider>
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-3">
        
        <FormControl sx={{ m: 1, width: 570, marginTop:5,marginLeft:0,MarginBottom:15 }}>
        <Form.Label>Number of days</Form.Label>
            <TextField 
                // required
                id="outlined-required"
                label="Days"
                // defaultValue="0"
                placeholder='Enter number of days'
                value={days}
                onChange={handleDaysChange}
                />
            </FormControl>
            <Button type = "submit">Submit</Button>
        </div>

    </Form>

        
       

</div>


    
  );

}
