const forgotPasswordTemplate = ({name  , otp }) => {
 return `
<div>
<p> Dear, ${name}</p>
<p> You're Requested a password reset.
 Please use following OTP code to reset you Password.</p>
 <div style="background:yellow;font-size:20px">
${otp}
 </div>
 <P> This otp is only valif for 1 hour </p>
 <p> Thanks </p>
 <p> Blinkeyit </p>
 </div>
 `
}
export default forgotPasswordTemplate