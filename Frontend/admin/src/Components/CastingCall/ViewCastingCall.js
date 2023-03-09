import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { VscLayersActive } from "react-icons/vsc";
import { SlNote } from "react-icons/sl";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import axios from "axios";
import { ViewCasting } from "../Columns/Columns";
import "../NewModels/NewModels.css";
import GlobalFilter from "../AllModels/GlobalFilter";
import { BsArrowDownUp } from "react-icons/bs";

function ViewCastingCall() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [datas, setData] = useState([]);
  const [select, setSelect] = useState(null);
  const [action, setAction] = useState(false);
  const [castingCallData, setCastingCallData] = useState([]);

  const fetchUser = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/register`
    );
    setData(response.data);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (id) => {
    setSelect(id);
    setAction(!action);
  };

  useEffect(() => {
    const castingCalls = datas.map((user) => user.castingcall).flat();
    setCastingCallData(castingCalls);
  }, [datas]);

  const columns = useMemo(() => ViewCasting, []);
  const data = useMemo(() => {
    const filteredData = castingCallData.filter((data) =>
      data.title.toLowerCase().includes(globalFilter.toLowerCase())
    );
    return filteredData;
  }, [castingCallData, globalFilter]);
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
    setPageSize,
    state,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    footerGroups,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    page,
  } = tableInstance;
  const { pageIndex, pageSize } = state;

  const handleClickActive = (id) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/client/register/active/${id}`)
      .then(() => fetchUser());
  };
  const handleClickInactive = (id) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/client/register/Inactive/${id}`)
      .then(() => fetchUser());
  };
  const handleClickDelete = (key) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/client/register/deleteAdmincastingcall/${key}`
      )
      .then(() => fetchUser());
  };

  return (
    <div className="bg-[#f1f6fa] ">
      <div className="bg-[white] rounded-[0.4rem] shadow-md flex flex-col gap-[20px] px-[20px] py-[20px] overflow-x-scroll scroll">
        <h className="font-semibold sticky left-0 tracking-wider ">
          View Casting Call
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
        <table {...getTableProps()} className="text-center text-[14px]">
          <thead>
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
                    className="font-semibold tracking-wide  px-[10px] py-[13px] bg-[white] border-[1px] "
                  >
                    <div className="flex items-center justify-center gap-[5px]">
                      <span> {column.render("Header")}</span>
                      <span className="text-[8px]">
                        <BsArrowDownUp />
                      </span>
                    </div>
                  </th>
                ))}
                <th className="font-semibold border-[1px]">Action</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="">
            {page.map((row, key) => {
              console.log(row);
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
                        className=" hover:text-[#4077B5] hover:duration-300 px-[20px] py-[2px] capitalize  border-[1px] "
                      >
                        <span>{cell.render("Cell")}</span>
                      </td>
                    );
                  })}
                  <td className="border-[1px]">
                    <div className="flex flex-col gap-[10px] relative">
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
                          <div className="bg-white shadow-md px-[10px] py-[10px] rounded-[0.2rem] w-[150px] gap-[5px] text-[14px] flex flex-col items-start">
                            <div className="flex gap-[10px] items-center">
                              <span>
                                <VscLayersActive />
                              </span>
                              <button
                                onClick={() =>
                                  handleClickActive(row.original._id)
                                }
                              >
                                Active
                              </button>
                            </div>

                            <div className="flex gap-[10px] items-center">
                              <span className="text-[12px]">
                                <SlNote />
                              </span>
                              <button
                                onClick={() =>
                                  handleClickInactive(row.original._id)
                                }
                              >
                                Inactive
                              </button>
                            </div>
                            <div className="flex gap-[10px] items-center">
                              <span className="text-[green]">
                                <FiEdit />
                              </span>
                              <Link
                                to={`/admin/home/EditCastingCall/${row.original._id}`}
                                state={{
                                  title: `${row.original.title}`,
                                  description: `${row.original.discription}`,
                                }}
                              >
                                Edit
                              </Link>
                            </div>
                            <div className="flex gap-[10px] items-center">
                              <span className="text-[red]">
                                <AiFillDelete />
                              </span>
                              <button
                                onClick={() =>
                                  handleClickDelete(row.original._id)
                                }
                              >
                                Delete
                              </button>
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
                    {...column.getFooterProps()}
                    className="font-semibold tracking-wide  px-[10px] py-[13px] bg-[white] border-[1px] "
                  >
                    <span>{column.render("Footer")}</span>
                  </td>
                ))}
                <th className="font-semibold border-[1px]">Action</th>
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
              className="bg-[black] w-[60px] h-[20px] rounded-[0.1rem] flex justify-center items-center text-[14px] font-fair font-semibold text-white"
            >
              PREV
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="bg-[black] w-[60px] h-[20px] rounded-[0.1rem] flex justify-center items-center text-[14px] font-fair font-semibold text-white"
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

export default ViewCastingCall;
