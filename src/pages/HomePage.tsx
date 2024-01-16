import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// interface User {
//     name: string;
//     email: string;
//     phoneNo: string;
// }

function HomePage() {
    const [name, setName] = useState<string>("");
    const [phoneNo, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        // Validations
        if (name.length < 3) {
            alert("Name should be at least 3 characters long");
            return;
        }
        if (!/^\d{10}$/.test(phoneNo)) {
            alert("Enter a valid 10-digit phone number");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Enter a valid email address");
            return;
        }

        // Save to localStorage
        localStorage.setItem("details", JSON.stringify({ name, email, phoneNo }));

        // Success message and navigate
        alert("Details stored successfully");
        navigate("/posts");
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: "20px",
            border: "1px solid",
            width: "40%",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
        }}>
            <h2 style={{ textAlign: "center" }}>Enter Your Details</h2>
            <Box sx={{ width: 500, maxWidth: '60%' }}>
                <TextField fullWidth label="Name" id="fullWidth" value={name} onChange={(e) => setName(e.target.value)} />
            </Box>
            <Box sx={{ width: 500, maxWidth: '60%' }}>
                <TextField fullWidth label="Phone No." id="fullWidth" value={phoneNo} onChange={(e) => setPhone(e.target.value)} />
            </Box>
            <Box sx={{ width: 500, maxWidth: '60%' }}>
                <TextField fullWidth label="Email" id="fullWidth" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Box>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </div>
    );
}

export default HomePage;
