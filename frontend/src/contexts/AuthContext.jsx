import axios, { HttpStatusCode } from "axios";
import {createContext, use, useContext} from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const client = axios.create({
  baseURL: "http://localhost:8000/api/v1/users",
  withCredentials: true,
});

export const AuthProvider = ({children}) => {
    const authContext = useContext(AuthContext);

    const [userData, setUserData] = useState(authContext);

    const handleRegister = async (username, name, password) => {
        try {
            const response = await client.post("/register", {
                username,
                name,
                password,
            });
            if(response.status===HttpStatusCode.Created){
                setUserData(response.data);
                router("/dashboard");
            }
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    const router = useNavigate();

    const data = {
        userData, setUserData
    } 
}