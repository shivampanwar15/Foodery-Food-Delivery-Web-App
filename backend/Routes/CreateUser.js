import express from 'express';
const router = express.Router();
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


router.post("/createuser",

    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),

    async (req, res) => {

        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        const secPassord = await bcrypt.hash(req.body.password, salt);

        try {
            await User.create({
                name: req.body.name,
                password: secPassord,
                email: req.body.email,
                location: req.body.location
            }).then(res.json({ success: true }));

        }
        catch (error) {
            res.json({ success: false });
        }


    })



router.post("/loginuser",

    async (req, res) => {


        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            const pwdPassword = await bcrypt.compare(req.body.password, userData.password);
            if (userData && pwdPassword) {
                const data = {
                      user:  {id : userData.id}
                    }
                    const authToken = jwt.sign(data, process.env.JWTSECRET_KEY);
                    return res.json({ success: true , authToken:authToken});
                    }



            else {
                    return res.status(400).json({ errors: " try again with correct email and password" });
                }
            }
        catch (error) {
                console.log(error)
                res.json({ success: false });
            }
        })

        
        export default router;