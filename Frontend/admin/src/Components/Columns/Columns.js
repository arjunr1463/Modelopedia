import "../../Full.css";

//NewModel
export const NewModelData = [
  {
    Header: "SI",
    Footer: "SI",
    accessor: (row, key) => <div>{key + 1}</div>,
  },
  {
    Header: "Model Image",
    Footer: "Model Image",
    accessor: (row) => (
      <div>
        <img
          src={`data:image/*;base64,${btoa(
            new Uint8Array(
              row.images[0] ? row.images[0].image.data.data : row
            ).reduce((data, byte) => data + String.fromCharCode(byte), "")
          )}`}
          alt=""
          className="h-[60px] w-[80px]"
        />
      </div>
    ),
    maxWidth: 400,
    minWidth: 130,
    width: 200,
  },
  {
    Header: "Fullname",
    Footer: "Fullname",
    accessor: (row) => (
      <div className="uppercase text-[13px]">{row.fullName}</div>
    ),
    maxWidth: 400,
    minWidth: 200,
    width: 200,
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "mobile",
    maxWidth: 400,
    minWidth: 180,
    width: 200,
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: (row) => <div className="lowercase">{row.email}</div>,
    maxWidth: 400,
    minWidth: 180,
    width: 200,
  },
  {
    Header: "Status",
    Footer: "Status",
    accessor: () => (
      <div>Pending</div>
    ),
  },
];


//ApproveImageData
export const ApproveImageData = [
  {
    Header: "SI",
    Footer: "SI",
    accessor: (row, key) => <div>{key + 1}</div>,
  },
  {
    Header: "Model Image",
    Footer: "Model Image",
    accessor: (row) => (
      <div>
        <img
          src={`data:image/*;base64,${btoa(
            new Uint8Array(
              row.images[0] ? row.images[0].image.data.data : row
            ).reduce((data, byte) => data + String.fromCharCode(byte), "")
          )}`}
          alt=""
          className="h-[60px] w-[80px]"
        />
      </div>
    ),
    maxWidth: 400,
    minWidth: 130,
    width: 200,
  },
  {
    Header: "Fullname",
    Footer: "Fullname",
    accessor: (row) => (
      <div className="uppercase text-[13px]">{row.fullName}</div>
    ),
    maxWidth: 400,
    minWidth: 180,
    width: 200,
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "mobile",
    maxWidth: 400,
    minWidth: 180,
    width: 200,
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: (row) => <div className="lowercase">{row.email}</div>,
    maxWidth: 400,
    minWidth: 180,
    width: 200,
  },
];

//AllModelsData
export const AllModelsData = [
  {
    Header: "SI",
    Footer: "SI",
    accessor: (row, key) => <div>{key + 1}</div>,
  },
  {
    Header: "Image",
    Footer: "Image",
    accessor: (row) => (
      <div>
        <img
          src={`data:image/*;base64,${btoa(
            new Uint8Array(
              row.images[0] ? row.images[0].image.data.data : row
            ).reduce((data, byte) => data + String.fromCharCode(byte), "")
          )}`}
          alt=""
          className="h-[60px] w-[80px]"
        />
      </div>
    ),
    maxWidth: 400,
    minWidth: 130,
    width: 200,
  },
  {
    Header: "Full Name",
    Footer: "Full Name",
    accessor: (row) => (
      <div className="uppercase text-[13px]">{row.fullName}</div>
    ),
    maxWidth: 400,
    minWidth: 200,
    width: 200,
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "mobile",
    maxWidth: 400,
    minWidth: 130,
    width: 200,
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: (row) => <div className="lowercase">{row.email}</div>,
    maxWidth: 400,
    minWidth: 180,
    width: 200,
  },
  {
    Header: "State",
    Footer: "State",
    accessor: "state",
    maxWidth: 400,
    minWidth: 100,
    width: 200,
  },

  {
    Header: "Personal Status",
    Footer: "Personal Status",
    accessor: (row) => <span>{row.personalStatus}</span>,
    maxWidth: 400,
    minWidth: 170,
    width: 170,
  },
  {
    Header: "Plan",
    Footer: "Plan",
    accessor: "paymentType",
    maxWidth: 400,
    minWidth: 100,
    width: 200,
  },

  {
    Header: "Plan Status",
    Footer: "Plan Status",
    accessor: "planEndDate",
    maxWidth: 400,
    minWidth: 145,
    width: 200,
  },
  {
    Header: "Created at",
    Footer: "Created at",
    accessor: (row) => <>{row.createdAt.slice(0, 10)}</>,
    maxWidth: 400,
    minWidth: 130,
    width: 200,
  },
];

//Trash Models
export const AllTrashModelData = [
  {
    Header: "SI",
    Footer: "SI",
    accessor: (row, key) => <div>{key + 1}</div>,
  },
  {
    Header: "Image",
    Footer: "Image",
    accessor: (row) => (
      <div>
        <img
          src={`data:image/*;base64,${btoa(
            new Uint8Array(
              row.images[0] ? row.images[0].image.data.data : row
            ).reduce((data, byte) => data + String.fromCharCode(byte), "")
          )}`}
          alt=""
          className="h-[60px] w-[80px]"
        />
      </div>
    ),
    maxWidth: 400,
    minWidth: 130,
    width: 200,
  },
  {
    Header: "Full Name",
    Footer: "Full Name",
    accessor: (row) => (
      <div className="uppercase text-[13px]">{row.fullName}</div>
    ),
    maxWidth: 400,
    minWidth: 200,
    width: 200,
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "mobile",
    maxWidth: 400,
    minWidth: 130,
    width: 200,
  },
  {
    Header: "State",
    Footer: "State",
    accessor: "state",
    maxWidth: 400,
    minWidth: 100,
    width: 200,
  },

  {
    Header: "Personal Status",
    Footer: "Personal Status",
    accessor: (row) => <span>{row.personalStatus}</span>,
    maxWidth: 400,
    minWidth: 170,
    width: 170,
  },
  {
    Header: "Plan",
    Footer: "Plan",
    accessor: "paymentType",
    maxWidth: 400,
    minWidth: 100,
    width: 200,
  },

  {
    Header: "Plan Status",
    Footer: "Plan Status",
    accessor: "planEndDate",
    maxWidth: 400,
    minWidth: 145,
    width: 200,
  },
];

//AllClientsData
export const AllClientData = [
  {
    Header: "SI",
    Footer: "SI",
    accessor: (row, key) => <div>{key + 1}</div>,
    maxWidth: 400,
    minWidth: 60,
    width: 60,
  },
  {
    Header: "Company Name",
    Footer: "Company Name",
    accessor: (row) => <div>{row.companyname}</div>,
    maxWidth: 400,
    minWidth: 180,
    width: 200,
  },
  {
    Header: "Full Name",
    Footer: "Full Name",
    accessor: (row) => (
      <div className="uppercase text-[13px]">{row.fullname}</div>
    ),
    maxWidth: 400,
    minWidth: 180,
    width: 200,
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: (row) => <div>{row.mobile}</div>,
    maxWidth: 400,
    minWidth: 100,
    width: 140,
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: (row) => <div>{row.email}</div>,
    maxWidth: 400,
    minWidth: 180,
    width: 180,
  },
  {
    Header: "State",
    Footer: "State",
    accessor: (row) => <div>{row.state}</div>,
    maxWidth: 400,
    minWidth: 100,
    width: 100,
  },
  {
    Header: "Status",
    Footer: "Status",
    accessor: (row) => <div>{row.personalStatus}</div>,
    maxWidth: 300,
    minWidth: 100,
    width: 100,
  },
];

//PortFolioData
export const AllPortfolioData = [
  {
    Header: "SI",
    Footer: "SI",
    accessor: (row, key) => <>{key + 1}</>,
  },
  {
    Header: "Full Name",
    Footer: "Full Name",
    accessor: (row) => (
      <span className="uppercase text-[13px]">{row.fullName}</span>
    ),
    maxWidth: 400,
    minWidth: 200,
    width: 200,
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "mobile",
    maxWidth: 400,
    minWidth: 130,
    width: 200,
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: (row) => <span className="lowercase">{row.email}</span>,
    maxWidth: 400,
    minWidth: 180,
    width: 200,
  },
  {
    Header: "State",
    Footer: "State",
    accessor: "state",
    maxWidth: 400,
    minWidth: 100,
    width: 200,
  },
  {
    Header: "Plan",
    Footer: "Plan",
    accessor: "paymentType",
    maxWidth: 400,
    minWidth: 100,
    width: 200,
  },

  {
    Header: "Plan Status",
    Footer: "Plan Status",
    accessor: "planEndDate",
    maxWidth: 400,
    minWidth: 145,
    width: 200,
  },
  {
    Header: "Enquiry Status",
    Footer: "Enquiry Status",
    accessor: (row) => <div>{row.enquiryStatus}</div>,
    maxWidth: 400,
    minWidth: 145,
    width: 200,
  },
  {
    Header: "Created at",
    Footer: "Created at",
    accessor: (row) => <>{row.createdAt.slice(0, 10)}</>,
    maxWidth: 400,
    minWidth: 130,
    width: 200,
  },
];

//ContestModel
export const ContestModelData = [
  {
    Header: "SI",
    Footer: "SI",
    accessor: "si",
    maxWidth: 100,
    minWidth: 60,
    width: 60,
  },
  {
    Header: "Applied at",
    Footer: "Applied at",
    maxWidth: 400,
    minWidth: 130,
    width: 130,
  },
  {
    Header: "Fullname",
    Footer: "Fullname",
    accessor: "Fullname",
    maxWidth: 400,
    minWidth: 200,
    width: 200,
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: "email",
    maxWidth: 400,
    minWidth: 180,
    width: 200,
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "phone",
    maxWidth: 400,
    minWidth: 130,
    width: 200,
  },
  {
    Header: "City",
    Footer: "City",
    maxWidth: 400,
    minWidth: 130,
    width: 130,
  },

  {
    Header: "State",
    Footer: "State",
    maxWidth: 400,
    minWidth: 130,
    width: 130,
  },
];

//ModelExpiry
export const ModelExpiryData = [
  {
    Header: "SI",
    Footer: "SI",
    accessor: (row, key) => <div>{key + 1}</div>,
    maxWidth: 100,
    minWidth: 60,
    width: 60,
  },
  {
    Header: "Model Name",
    Footer: "Model Name",
    accessor: (row) => <div>{row.fullName}</div>,
    maxWidth: 400,
    minWidth: 200,
    width: 200,
  },
  {
    Header: "Plan Date",
    Footer: "Plan Date",
    accessor: "paymentType",
    maxWidth: 400,
    minWidth: 130,
    width: 200,
  },
  {
    Header: "Remaining Date",
    Footer: "Remaining Date",
    accessor: "remainingDays",
    maxWidth: 400,
    minWidth: 130,
    width: 130,
  },

  {
    Header: "Status",
    Footer: "Status",
    accessor: "status",
    maxWidth: 400,
    minWidth: 130,
    width: 130,
  },
];

//Blog
export const ViewBlogData = [
  {
    Header: "SI.",
    Footer: "SI.",
    accessor: (row, i) => <>{i + 1}</>,
    width: 80,
  },
  {
    Header: "Title",
    Footer: "Title",
    accessor: "title",
    maxWidth: 400,
    minWidth: 220,
    width: 200,
  },
  {
    Header: "Description",
    Footer: "Description",
    accessor: (row) => (
      <div
        dangerouslySetInnerHTML={{ __html: row.discription }}
        className="h-[100px] overflow-y-scroll"
      ></div>
    ),
    maxWidth: 400,
    minWidth: 400,
    width: 200,
  },
  {
    Header: "Image",
    Footer: "Image",
    accessor: (row) => (
      <img
        src={`data:image/*;base64,${btoa(
          new Uint8Array(row.image.data ? row.image.data.data : row).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        )}`}
        alt=""
        className="h-[100px] w-[150px]"
      />
    ),
    maxWidth: 400,
    minWidth: 180,
    width: 200,
  },
  {
    Header: "Status",
    Footer: "Status",
    accessor: (row) => <span>{row.status}</span>,
    maxWidth: 400,
    minWidth: 130,
    width: 130,
  },
];

//SpecialStory
export const ViewSpecialStory = [
  {
    Header: "SI.",
    Footer: "SI.",
    accessor: (row, i) => <span className="flex h-[300px]">{i + 1}</span>,
    width: 80,
  },
  {
    Header: "Model",
    Footer: "Model",
    accessor: (row) => (
      <span className="uppercase flex text-[13px] h-[300px]">
        {row.fullName}
      </span>
    ),
    maxWidth: 400,
    minWidth: 200,
    width: 200,
  },
  {
    Header: "Model ID",
    Footer: "Model ID",
    accessor: (row) => (
      <span className="uppercase flex justify-center text-[13px] h-[300px]">
        {row.id}
      </span>
    ),
    maxWidth: 400,
    minWidth: 130,
    width: 130,
  },
  {
    Header: "Image",
    Footer: "Image",
    accessor: (row) => (
      <img
        src={`data:image/*;base64,${btoa(
          new Uint8Array(
            row.specialstory.featuredimages
              ? row.specialstory.featuredimages.data.data
              : row
          ).reduce((data, byte) => data + String.fromCharCode(byte), "")
        )}`}
        alt=""
        className="h-[300px] w-[250px]"
      />
    ),
    maxWidth: 400,
    minWidth: 250,
    width: 200,
  },
  {
    Header: "Description",
    Footer: "Description",
    accessor: (row) => (
      <div
        dangerouslySetInnerHTML={{
          __html: row.specialstory.specialdescription,
        }}
        className="h-[300px] overflow-y-scroll"
      ></div>
    ),
    maxWidth: 400,
    minWidth: 400,
    width: 200,
  },

  {
    Header: "Status",
    Footer: "Status",
    accessor: (row) => (
      <div className="h-[300px]">{row.specialstory.status}</div>
    ),
    maxWidth: 400,
    minWidth: 110,
    width: 200,
  },
  {
    Header: "Story Status",
    Footer: "Story Status",
    accessor: (row) => <div className="h-[300px]">{row.planstatus}</div>,
    maxWidth: 400,
    minWidth: 140,
    width: 200,
  },
];

//OurTeam
export const ViewOur = [
  {
    Header: "SI.",
    Footer: "SI.",
    accessor: (row, i) => <span className="">{i + 1}</span>,
    width: 80,
  },
  {
    Header: "Full Name",
    Footer: "Full Name",
    accessor: (row) => (
      <span className="uppercase text-[13px]">{row.name}</span>
    ),
    maxWidth: 400,
    minWidth: 180,
    width: 200,
  },
  {
    Header: "Designation",
    Footer: "Designation",
    accessor: (row) => <span className="">{row.designation}</span>,
    maxWidth: 400,
    minWidth: 180,
    width: 200,
  },
  {
    Header: "Image",
    Footer: "Image",
    accessor: (row) => (
      <img
        src={`data:image/*;base64,${btoa(
          new Uint8Array(row.image.data ? row.image.data.data : row).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        )}`}
        alt=""
        className="h-[100px]"
      />
    ),
    maxWidth: 400,
    minWidth: 150,
    width: 200,
  },
  {
    Header: "Content",
    Footer: "Content",
    accessor: (row) => (
      <div
        dangerouslySetInnerHTML={{ __html: row.description }}
        className="h-[150px] overflow-y-scroll"
      ></div>
    ),
    maxWidth: 400,
    minWidth: 400,
    width: 200,
  },
  {
    Header: "Who",
    Footer: "Who",
    accessor: (row) => <span className="">{row.selectmember}</span>,
    maxWidth: 400,
    minWidth: 150,
    width: 200,
  },

  {
    Header: "Status",
    Footer: "Status",
    accessor: (row) => <span className="">{row.status}</span>,
    maxWidth: 400,
    minWidth: 110,
    width: 200,
  },
];

//Testimony
export const ViewTestimonyData = [
  {
    Header: "SI.",
    Footer: "SI.",
    accessor: (row, i) => <span className="">{i + 1}</span>,
    width: 80,
  },
  {
    Header: "Full Name",
    Footer: "Full Name",
    accessor: (row) => (
      <span className="uppercase text-[13px]">{row.fullname}</span>
    ),
    maxWidth: 400,
    minWidth: 180,
    width: 200,
  },
  {
    Header: "Model ID/company",
    Footer: "Model ID/company",
    accessor: (row) => <span className="">{row.companyname}</span>,
    maxWidth: 400,
    minWidth: 180,
    width: 180,
  },
  {
    Header: "Image",
    Footer: "Image",
    accessor: (row) => (
      <img
        src={`data:image/*;base64,${btoa(
          new Uint8Array(
            row.image ? (row.image.data ? row.image.data.data : "") : ""
          ).reduce((data, byte) => data + String.fromCharCode(byte), "")
        )}`}
        alt=""
        className="h-[100px]"
      />
    ),
    maxWidth: 400,
    minWidth: 150,
    width: 200,
  },
  {
    Header: "Content",
    Footer: "Content",
    accessor: (row) => (
      <div
        dangerouslySetInnerHTML={{ __html: row.discription }}
        className=""
      ></div>
    ),
    maxWidth: 400,
    minWidth: 400,
    width: 200,
  },
  {
    Header: "Status",
    Footer: "Status",
    accessor: (row) => <span className="">{row.status}</span>,
    maxWidth: 400,
    minWidth: 110,
    width: 200,
  },
];

//castingcall
export const ViewCasting = [
  {
    Header: "SI.",
    Footer: "SI.",
    accessor: (row, key) => <>{key + 1}</>,
    width: 70,
  },
  {
    Header: "Title",
    Footer: "Title",
    accessor: (row) => <>{row.title}</>,
    maxWidth: 400,
    minWidth: 350,
    width: 250,
  },

  {
    Header: "Image",
    Footer: "Image",
    accessor: (row) => (
      <img
        src={`data:image/*;base64,${btoa(
          new Uint8Array(row.image ? row.image.data.data : row).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        )}`}
        alt=""
        className="h-[100px] w-full px-[15px]"
      />
    ),
    maxWidth: 400,
    minWidth: 150,
    width: 200,
  },
  {
    Header: "Description",
    Footer: "Description",
    accessor: (row) => (
      <div
        dangerouslySetInnerHTML={{ __html: row.discription }}
        className="h-[150px] text-left break-all overflow-y-scroll"
      ></div>
    ),
    maxWidth: 400,
    minWidth: 250,
    width: 250,
  },
  {
    Header: "Status",
    Footer: "Status",
    accessor: "status",
    maxWidth: 400,
    minWidth: 100,
    width: 100,
  },
];

//castingcallModels
export const CastingModel = [
  {
    Header: "SI.",
    Footer: "SI.",
    accessor: (row, key) => <>{key + 1}</>,
    width: 60,
  },
  {
    Header: "Casting Title",
    Footer: "Casting Title",
    accessor: (row) => (
      <div className="text-[13px]">{row.castingCallTitle}</div>
    ),
    maxWidth: 400,
    minWidth: 350,
    width: 250,
  },

  {
    Header: "Casting from ",
    Footer: "Casting from ",
    accessor: "companyname",
    maxWidth: 400,
    minWidth: 200,
    width: 200,
  },
  {
    Header: "Created By",
    Footer: "Created By",
    accessor: (row) => <span className="text-[13px]">{row.fullname}</span>,
    maxWidth: 400,
    minWidth: 200,
    width: 200,
  },
  {
    Header: "Total Models",
    Footer: "Total Models",
    accessor: "total",
    maxWidth: 400,
    minWidth: 140,
    width: 140,
  },
  {
    Header: "Created At",
    Footer: "Created At",
    accessor: (row) => <>{row.castingCallCreated.slice(0, 10)}</>,
    maxWidth: 400,
    minWidth: 150,
    width: 150,
  },
];

//ViewCastingModels
export const ViewCastingModelData = [
  {
    Header: "SI",
    Footer: "SI",
    accessor: (row, key) => <div>{key+1}</div>,
  },
  {
    Header: "Model Name",
    Footer: "Model Name",
    accessor: (row) => (
      <div className="uppercase text-[13px]">
        {row.fullName}
      </div>
    ),
    maxWidth: 400,
    minWidth: 200,
    width: 200,
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: (row) => <div>{row.mobile }</div>,
    maxWidth: 400,
    minWidth: 130,
    width: 200,
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: (row) => (
      <div className="lowercase">{row.email }</div>
    ),
    maxWidth: 400,
    minWidth: 180,
    width: 200,
  },
  {
    Header: "City",
    Footer: "City",
    accessor: (row) => <div>{row.city}</div>,
    maxWidth: 400,
    minWidth: 100,
    width: 200,
  },
  {
    Header: "State",
    Footer: "State",
    accessor: (row) => <div>{row.state}</div>,
    maxWidth: 400,
    minWidth: 100,
    width: 200,
  },
];
