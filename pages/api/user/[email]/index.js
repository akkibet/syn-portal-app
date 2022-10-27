import connect from '../../../../utils/connect';
import User from '../../../../models/user';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {        
        case 'GET':
            try {                                
                const email = req.query.email;
                const user = await User.find({email});

                console.log(user.length);

                if (user.length == 0) {
                    res.status(200).json({ success: true, data: user })
                } else {
                    res.status(400).json({ success: false });
                }
            } catch (error) {
                res.status(404).json({ success: false });
            }
            break;        
    }
}