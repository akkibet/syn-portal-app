import sendgrid from "@sendgrid/mail";
import connect from '../../../../../utils/connect';
import Code from '../../../../../models/code';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const email = req.query.email;
                const code = await Code.find({ email });

                res.status(200).json({ success: true, code })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PATCH':
            try {
                const email = req.query.email;
                const findCode = await Code.find({ email });
                const id = findCode[0]._id.toString();

                if (!findCode) return res.status(404).json({ message: "No Data Found" });
                const updatedCode = await Code.updateOne({ _id: id }, { $set: req.body });

                // send the email
                sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);
                const msg = {
                    to: req.body.email,
                    from: process.env.NEXT_PUBLIC_DOMAIN_FROM,
                    subject: 'Your Verification Code - Reset Password',
                    text: `
                        Good day,
                        Thank you for signing up to SynTechNX, here is you access code ${req.body.code} to the portal.
                        If you have any problems accessing the course, please contact admin (admin@syntechnx.com)
                        Kind Regards,
                        Admin
                    `,
                    html: `
                        <p>Good day,</p>
                        <p>Thank you for signing up to SynTechNX, here is you access code ${req.body.code} to the portal.</p>
                        <p>If you have any problems accessing the course, please contact admin (admin@syntechnx.com)</p><br />
                        <p>Kind Regards,</p>
                        <p>Admin</p>
                    `
                }

                // Disable muna
                await sendgrid.send(msg).catch(error => console.log('Something went wrong'));
                
                res.status(201).json({ success: true, data: updatedCode })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}