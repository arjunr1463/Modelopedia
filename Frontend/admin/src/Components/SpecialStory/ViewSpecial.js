import React, { useMemo, useState, useEffect } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import axios from "axios";
import { ViewSpecialStory } from "../Columns/Columns";
import "../NewModels/NewModels.css";
import GlobalFilter from "../AllModels/GlobalFilter";
import { BsArrowDownUp } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { VscLayersActive } from "react-icons/vsc";
import { SlNote } from "react-icons/sl";
import { AiFillDelete } from "react-icons/ai";
import "../CastingCall/CastingCall.css";
import { GrView } from "react-icons/gr";
import {Link} from "react-router-dom"
function ViewSpecial() {
  const[globalFilter,setGlobalFilter]=useState("")
  const [Data, setData] = useState([]);
  const [action, setAction] = useState(false);
  const [select, setSelect] = useState("");
  const [remainingDays, setRemainingDays] = useState(null);
  console.log(remainingDays)
  const fetchData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/register`);
    setData(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = useMemo(() => ViewSpecialStory, []);
  const data = useMemo(() => {
    const filters = Data.filter(
      (data) => data.specialstory && data.specialstory.featuredimages
    );
    const filterData=filters.filter((data)=>data.fullName.toLowerCase().includes(globalFilter.toLowerCase()))
    
    const mappedData = filterData.map((data) => {
      const remainingDays = Math.ceil(
        (new Date(data.planEndDate) - new Date()) / (1000 * 60 * 60 * 24)
      );
      setRemainingDays(Math.max(0, remainingDays));
      const planstatuss =filterData? remainingDays <= 0 ? "Expired" : "Not Expired":"";
      return {
        ...data,
        planstatus: planstatuss,
      };
    });
    return mappedData;
  }, [Data,globalFilter]);
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    setPageSize,
    footerGroups,
    pageCount,
    state,
  } = tableInstance;
  const { pageIndex, pageSize } = state;
  const handleChange = (id) => {
    setAction(!action);
    setSelect(id);
  };

  const handleClickApprove = (id) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/user/register/adminspecialstory/specialstoryactive/${id}`)
      .then(() => fetchData());
  };
  const handleClickReject = (id) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/user/register/adminspecialstory/specialstoryrejected/${id}`)
      .then(() => fetchData());
  };
  const handleClickDelete = (key) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/user/register/AdminUserSpecialStory/admin/delete/${key}`)
      .then((res) => {
        console.log(res)
        fetchData()});
  };

  return (
    <div className="">
      <div className="bg-[white] rounded-[0.4rem] shadow-lg flex flex-col gap-[20px] px-[20px] py-[20px] overflow-x-scroll scroll">
        <h className="font-semibold sticky left-0 tracking-wider ">
          View Special Story
        </h>

        <div className="border-b-[2px] w-[150px] sticky left-0"></div>
        <div className="flex flex-col md:flex-row gap-[20px] justify-between sticky left-0">
          <div className="flex items-center gap-[10px]">
            <span>Show</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="outline-none border-[1px] w-[60px] h-[30px] text-center"
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <span>Entries</span>
          </div>
          <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        </div>
        <table {...getTableProps()} className="text-[14px] text-center">
          <thead className="">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="">
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps([
                      column.getSortByToggleProps(),
                      {
                        style: {
                          minWidth: column.minWidth,
                          width: column.width,
                        },
                      },
                    ])}
                    className=" tracking-wide  px-[10px] py-[13px] bg-[white] border-[1px] "
                  >
                    <div className="flex items-center justify-center gap-[5px]">
                      <span> {column.render("Header")}</span>
                      <span className="text-[12px]">
                        <BsArrowDownUp />
                      </span>
                    </div>
                  </th>
                ))}
                <th className="border-[1px]">Action</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, key) => {
              prepareRow(row, key);
              return (
                <tr {...row.getRowProps()} key={row.id} className="table-row">
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps({
                          style: {
                            minWidth: cell.minWidth,
                            width: cell.width,
                            maxWidth: cell.maxWidth,
                          },
                        })}
                        className="text-left hover:text-[#4077B5] hover:duration-300 px-[20px] py-[20px]  text-[15px] border-[1px] "
                      >
                        <span>{cell.render("Cell")}</span>
                      </td>
                    );
                  })}
                  <td className="border-[1px]">
                    <div className="flex flex-col gap-[10px] relative h-[300px]">
                      <div className="flex justify-center w-[200px] ">
                        <div
                          onClick={() => handleChange(key)}
                          className="flex gap-[5px] cursor-pointer bg-[#4099ff] hover:duration-300 text-white justify-center items-center w-[60px] h-[30px]"
                        >
                          <span className="text-[18px]">
                            <AiFillSetting />
                          </span>
                          <span className="text-[14px]">
                            <AiFillCaretDown />
                          </span>
                        </div>
                      </div>
                      {action && select === key && (
                        <div className="flex justify-center absolute top-[32px] right-[100px]">
                          <div className="bg-white shadow-md px-[10px] py-[10px] rounded-[0.2rem] w-[150px] gap-[10px] text-[14px] flex flex-col items-start">
                            <div className="flex gap-[10px] items-center">
                              <span>
                                <VscLayersActive />
                              </span>
                              <button onClick={()=>handleClickApprove(row.original._id)}>Approved</button>
                            </div>

                            <div className="flex gap-[10px] items-center">
                              <span className="text-[12px]">
                                <SlNote />
                              </span>
                              <button onClick={()=>handleClickReject(row.original._id)}>Rejected</button>
                            </div>
                            <Link state={{
                              name:row.original.fullName,
                              description:row.original.specialstory.specialdescription,
                              image:row.original.specialstory.featuredimages.data.data
                            }} to={`/admin/home/SingleModel/${row.original._id}`} className="flex gap-[10px] items-center">
                              <span >
                                <GrView />
                              </span>
                              <button>View</button>
                            </Link>
                            <Link state={{
                              name:row.original.fullName,
                              modelid:row.original.id,
                              description:row.original.specialstory.specialdescription
                            }} to={`/admin/home/EditSpecialStory/${row.original._id}`} className="flex gap-[10px] items-center">
                              <span>
                                <SlNote />
                              </span>
                              <button>Edit</button>
                            </Link>
                            <div className="flex gap-[10px] items-center">
                              <span className="text-[red]">
                                <AiFillDelete />
                              </span>
                              <button onClick={()=>handleClickDelete(row.original._id)}>Delete</button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            {footerGroups.map((footerGroup) => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((column) => (
                  <td
                    {...column.getFooterProps}
                    className="font-semibold tracking-wide  px-[10px] py-[13px] bg-[white] border-[1px] "
                  >
                    <span>{column.render("Footer")}</span>
                  </td>
                ))}
                <th className="border-[1px]">Action</th>
              </tr>
            ))}
          </tfoot>
        </table>

        <div className="flex flex-col md:flex-row gap-[10px] md:gap-0 items-center justify-between sticky left-0">
          <div className="flex gap-[10px]">
            <span>Showing</span>
            <strong>
              {pageIndex + 1} <span className="font-normal">of</span>{" "}
              {pageOptions.length}
            </strong>
            <span>entries</span>
          </div>
          <div className="flex flex-row items-center gap-[10px]">
            <button
              className="font-semibold text-[20px]"
              onClick={() => gotoPage(0)}
            >
              {"<<"}
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="bg-[black] w-[60px] h-[20px] rounded-[0.2rem] flex justify-center items-center text-[14px] font-semibold text-white"
            >
              PREV
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="bg-[black] w-[60px] h-[20px] rounded-[0.2rem] flex justify-center items-center text-[14px] font-semibold text-white"
            >
              NEXT
            </button>
            <button
              className="font-semibold text-[20px]"
              onClick={() => gotoPage(pageCount - 1)}
            >
              {">>"}
            </button>
          </div>
          <div>
            GoToPage:{""}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              className="w-[50px] outline-none border-[1px] text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSpecial;
