import { FaUser, FaUserMinus, FaUserPlus } from "react-icons/fa";

const SubscriptionDetails = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-white w-full flex flex-col lg:flex-row gap-6">
        {/* Left Column - Current Plan Details */}
        <section className="flex-1">
          <h2 className="text-[#2f2f2f] text-base font-extrabold mt-2 mb-6">
            CURRENT PLAN DETAILS
          </h2>
          <div className="text-sm text-[#A6A6A6] space-y-2">
            <p>
              Plan Type:
              <span className="text-black ml-2">Professional</span>
            </p>
            <p>
              Subscription Type:
              <span className="text-black ml-2">Monthly</span>
              <span className="text-blue-600 ml-2 cursor-pointer underline">
                Change
              </span>
            </p>
            <p>
              Next Billing Date:
              <span className="text-black ml-2">August 20, 2024</span>
            </p>
            <p>
              Price:
              <span className="text-black ml-2"> $199/user/month</span>
            </p>
            <p>
              Number of Users:
              <span className="text-black ml-2"> 05</span>
              <span className="text-blue-600 ml-2 cursor-pointer underline">
                Add
              </span>
            </p>
            <p>
              Auto Renew:
              <span className="text-black ml-2">Yes</span>
            </p>
          </div>
        </section>

        {/* Right Column - User Management */}
        <section className="flex-auto">
          <h2 className="text-[#2f2f2f] text-base font-extrabold mt-2 mb-6">
            USER MANAGEMENT
          </h2>
          <div className="flex justify-evenly rounded-lg items-center bg-blue-50 py-4 mb-6">
            <div className="flex flex-col items-center">
              <FaUser className="text-gray-500" size={22} />
              <p className="text-gray-500 text-base">Users Limit</p>
              <p className="text-xl font-semibold">5</p>
            </div>
            <div className="border-l h-12 border-gray-300"></div>
            <div className="flex flex-col items-center">
              <FaUserPlus className="text-gray-500" size={24} />
              <p className="text-gray-500 text-base">Joined</p>
              <p className="text-xl font-semibold">4</p>
            </div>
            <div className="border-l h-12 border-gray-300"></div>
            <div className="flex flex-col items-center">
              <FaUserMinus className="text-gray-500" size={24} />
              <p className="text-gray-500 text-base">Free</p>
              <p className="text-xl font-semibold">1</p>
            </div>
          </div>

          <section className="space-y-3">
            {/* Users List */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">
                  JS
                </div>
                <span className="ml-3 text-gray-700 text-xs">
                  john_smith@gmail.com
                </span>
              </div>
              <span className="text-xs text-gray-500">Owner</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">
                  KT
                </div>
                <span className="ml-3 text-gray-700 text-xs">
                  kelly.test@gmail.com
                </span>
              </div>
              <span className="text-xs text-gray-500">Team Member</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="border-2 border-dashed border-gray-400 text-gray-400 rounded-full h-8 w-8 flex items-center justify-center font-bold">
                  <FaUser />
                </div>
                <span className="ml-3 text-gray-700 text-xs">
                  josh_brueckner@gmail.com
                </span>
              </div>
              <span className="text-xs text-[#82D955]">Invite Sent</span>
            </div>
          </section>

          <div className="flex justify-end">
            <button className="mt-8 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-[10px] px-8 rounded-md">
              Leave Plan
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SubscriptionDetails;
