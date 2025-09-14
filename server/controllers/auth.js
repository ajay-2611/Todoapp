const user = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async(req, res) => {
    const { username, email, password } = req.body;

    console.log('Registration attempt:', { username, email, password: '***' });

    // Validate required fields
    if (!username || !email || !password) {
        console.log('Missing required fields');
        return res.status(400).json({ 
            message: 'Username, email, and password are required' 
        });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.log('Invalid email format');
        return res.status(400).json({ 
            message: 'Please provide a valid email address' 
        });
    }

    // Validate password length
    if (password.length < 6) {
        console.log('Password too short');
        return res.status(400).json({ 
            message: 'Password must be at least 6 characters long' 
        });
    }

    try {
        // Check if user already exists
        const existingUser = await user.findOne({ 
            $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] 
        });
        
        if (existingUser) {
            console.log('User already exists');
            return res.status(400).json({ message: 'User already exists with this email or username' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const dbUser = new user({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        await dbUser.save();
        console.log('User saved successfully:', dbUser._id);

        // Generate JWT token
        const token = jwt.sign(
            { userId: dbUser._id, username: dbUser.username },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '24h' }
        );

        console.log('Registration successful for user:', dbUser.username);

        return res.status(201).json({ 
            message: "Successfully registered new user",
            token: token,
            user: {
                id: dbUser._id,
                username: dbUser.username,
                email: dbUser.email
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        console.error('Error stack:', error.stack);
        
        // Handle specific MongoDB errors
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: 'User already exists with this email or username' 
            });
        }
        
        return res.status(500).json({ 
            message: 'Internal server error during registration', 
            error: error.message 
        });
    }
}

exports.loginUser = async(req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const dbUser = await user.findOne({ email: email.toLowerCase() });
        
        if (!dbUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, dbUser.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: dbUser._id, username: dbUser.username },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: dbUser._id,
                username: dbUser.username,
                email: dbUser.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(400).json({ 
            message: 'Error logging in user!', 
            error: error.message 
        });
    }
}