import Link from "next/link";

export default function Policy() {
  return (
    <>
    <div className="lg:px-24 px-7 pt-40 overflow-hidden mb-10">
        <h1 className="font-extrabold text-lg">Privacy Policy</h1>

        <p className="mt-5 leading-7">This Privacy Policy outlines the practices regarding the collection, use, and disclosure of information by our service. By choosing to use our service, you agree to the collection and use of information as described in this policy. TS360 only collects HTML elements (nodes) and does not gather any personal information. All data collected is immediately flushed at the end of your session. We guarantee that your information will not be shared with any third parties. The terms used in this Privacy Policy carry the same meanings as those in our <a href="#">Terms and Conditions</a>.</p>



        <h2 className="font-bold mt-4">Information Collection and Usage</h2>



        <h3 className="font-semibold mt-2">Log Data</h3>

        <p className="mt-2 leading-7">We collect information when you encounter any issues or errors while using our service. This log data is used to understand and resolve errors more effectively.</p>



        <h3 className="font-semibold mt-3">Security</h3>

        <p className="mt-2 leading-7">We place a high value on your trust and strive to ensure the security of your data. We do not monitor your activity, and all data fetched during your session is deleted as soon as the session ends, ensuring a secure and reliable experience.</p>



        <h3 className="font-semibold mt-3">Links to Other Sites</h3>

        <p className="mt-2 leading-7">Our service may contain links to other websites, but we assure you that these are not third-party sites and are related to our product. Feel free to explore these links.</p>



        <h3 className="font-semibold mt-3">Changes to This Privacy Policy</h3>

        <p className="mt-2 leading-7">This Privacy Policy may be updated periodically. We encourage you to review it regularly. Any changes will be posted and will take effect immediately. You will be notified of any updates before they take effect.</p>



        <h3 className="font-semibold mt-3">Contact Us</h3>

        <p className="mt-2 leading-7">If you have any questions or suggestions regarding our Privacy Policy, please contact us at <Link  className="underline text-blue-600" target="_blank" href="mailto:contact@testsprint360.com">contact@testsprint360.com</Link>.</p>
    </div>
</>
  )
}
