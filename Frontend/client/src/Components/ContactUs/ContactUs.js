import React from "react";

function ContactUs() {
  return (
    <div className="flex flex-col items-center bg-[#f8f9fa] gap-[60px]">
      <div className="flex flex-col md:flex-row gap-[30px] items-center lg:items-start justify-center bg-[#f8f9fa] px-[10px] pt-[50px] sm:pt-[100px]">
        <div className="hidden lg:flex ">
          <iframe
            title="myframe1"
            width="500"
            height="440"
            src="https://maps.google.com/maps?width=700&amp;height=440&amp;hl=en&amp;q=AKG%20Rd%2C%20Koonamthai%2C%20Edappally%2C%20Ernakulam%2C%20Kerala%20682024+(Title)&amp;ie=UTF8&amp;t=&amp;z=10&amp;iwloc=B&amp;output=embed"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
        </div>
        <div className="hidden md:flex lg:hidden">
          <iframe
            title="myframe2"
            width="350"
            height="440"
            src="https://maps.google.com/maps?width=700&amp;height=440&amp;hl=en&amp;q=AKG%20Rd%2C%20Koonamthai%2C%20Edappally%2C%20Ernakulam%2C%20Kerala%20682024+(Title)&amp;ie=UTF8&amp;t=&amp;z=10&amp;iwloc=B&amp;output=embed"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
        </div>
        <div className="flex flex-col w-[90vw] sm:w-[450px] md:w-[350px] lg:w-[480px] items-center px-[10px] sm:px-[40px] py-[50px] gap-[30px] bg-white">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full h-[50px] px-[10px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] text-[15px] sm:text-[18px] tracking-wider text-[#7e7c7b]"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full h-[50px] px-[10px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] text-[15px] sm:text-[18px] tracking-wider text-[#7e7c7b]"
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            className="w-full h-[50px] px-[10px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] text-[15px] sm:text-[18px] tracking-wider text-[#7e7c7b]"
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full h-[50px] px-[10px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] text-[15px] sm:text-[18px] tracking-wider text-[#7e7c7b]"
          />
          <input
            type="text"
            placeholder="Message"
            className="w-full h-[150px] px-[10px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] text-[15px] sm:text-[18px] tracking-wider text-[#7e7c7b]"
          />
          <button className="bg-[#ea4335] flex justify-center items-center rounded-[1.5rem] h-[50px] w-[150px] font-semibold text-[18px] text-white font-[sans-serif]">
            Send Message
          </button>
        </div>
        <div className="flex sm:hidden ">
          <iframe
            title="myframe3"
            width="250"
            height="360"
            src="https://maps.google.com/maps?width=700&amp;height=440&amp;hl=en&amp;q=AKG%20Rd%2C%20Koonamthai%2C%20Edappally%2C%20Ernakulam%2C%20Kerala%20682024+(Title)&amp;ie=UTF8&amp;t=&amp;z=10&amp;iwloc=B&amp;output=embed"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
        </div>
        <div className="hidden sm:flex md:hidden ">
          <iframe
            title="myframe4"
            width="440"
            height="360"
            src="https://maps.google.com/maps?width=700&amp;height=440&amp;hl=en&amp;q=AKG%20Rd%2C%20Koonamthai%2C%20Edappally%2C%20Ernakulam%2C%20Kerala%20682024+(Title)&amp;ie=UTF8&amp;t=&amp;z=10&amp;iwloc=B&amp;output=embed"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
        </div>
      </div>
      <div className="flex flex-col w-[90vw] sm:w-[450px] md:w-full md:flex-row md:justify-center md:gap-[10px] lg:gap-[30px] pb-[20px] px-[10px]">
        <div className="bg-white flex flex-col md:w-[180px] lg:w-[220px] px-[10px] py-[10px]">
          <span className="text-[#848f9a]">Address:</span>
          <span>
            Suite 112, 39/2475-B1, LR Towers, Sjrra 104, Janatha Rd,
            Palarivattom, Cochin, Kerala - 682 025
          </span>
        </div>
        <div className="bg-white flex flex-col  md:w-[180px] lg:w-[220px] px-[10px] py-[10px]">
          <span className="text-[#848f9a]">Address:</span>
          <span>
            40 BowLand Road, Manchester, M231JG, United Kingdom, +447471044700
          </span>
        </div>
        <div className="bg-white flex flex-row md:w-[190px] lg:w-[220px] px-[10px] py-[10px]">
          <span className="text-[#848f9a]">phone:</span>
          <span>+91 9072790720</span>
        </div>
        <div className=" bg-white flex flex-col md:w-[190px] lg:w-[220px] px-[10px] py-[10px]">
          <span className="text-[#848f9a]">Email:</span>
          <span>
            <a href="mailto:sales@modelopedia.com">sales@modelopedia.com</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
