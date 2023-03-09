import React from "react";
import axios from "axios";
import bg from "../../Assets/Payment/bg1.png"
import { useNavigate } from "react-router-dom";

function PaymentFeatured() {
  const navigate=useNavigate()
  const initPayment = (data) => {
    const options = {
      key: "rzp_test_xgkbYxzYuD1cVM",
      amount: data.amount,
      currency: data.currency,
      name: 'Modelopedia', 
      image: bg,
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const token = localStorage.getItem("token");
          const verifyUrl = `${process.env.REACT_APP_API_URL}/api/user/register/verify`;
          const { data } = await axios.post(verifyUrl, response, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(()=>navigate("/Admin/Model/Completed"))
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#242424",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      const orderUrl = `${process.env.REACT_APP_API_URL}/api/user/register/payment`;
      const { data } = await axios.post(
        orderUrl,
        { amount: 3999 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border-[1px] ">
      <div className="border-b-[1px] h-[50px] flex items-center px-[10px] font-semibold text-[20px]">
        <h>DashBoard</h>
      </div>
      <div className="flex flex-col py-[20px] px-[30px]">
        <div className="flex flex-col bg-white shadow-md rounded-[0.3rem]">
          <div className="flex flex-col items-center bg-black text-white py-[30px] rounded-[0.3rem]">
            <h className="text-[30px] font-semibold">Featured Plan</h>
            <div>
              <span className="text-[26px] font-semibold">3999</span>
              <span>/-</span>
              <span className="text-[12px] ">Per Month</span>
            </div>

            <span className="text-[10px] font-fair">*GST included</span>
          </div>
          <div className="pt-[50px]  pb-[10px] flex flex-col gap-[100px]">
            <div className="flex flex-col gap-[20px] text-[16px] font-fair text-center px-[30px]">
              <span>1 Year Subscription</span>
              <span>180 Days Featuring Listing</span>
              <span>20 Photos</span>
              <span>5 Videos</span>
              <span>Social Media Campaign</span>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handlePayment}
                className="bg-black flex justify-center items-center  text-white font-semibold font-fair h-[40px] w-[130px]"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentFeatured;
