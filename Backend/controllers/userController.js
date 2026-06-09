import bcrypt from "bcrypt";
import validator from "validator";
import userModal from "../models/userModal.js";

// login user without JWT token
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModal.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Send success without token
        res.json({ success: true, message: "Login successful", user: { name: user.name, email: user.email } });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// register user without JWT token
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModal.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModal({ name, email, password: hashedPassword });
        const user = await newUser.save();

        // Send success without token
        res.json({ success: true, message: "Registration successful", user: { name: user.name, email: user.email } });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { loginUser, registerUser };
