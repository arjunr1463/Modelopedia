import React, { useMemo, useState, useEffect } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useRowSelect,
} from "react-table";
import { Checkbox } from "../Checkbox/Checkbox";
import axios from "axios";
import { AllModelsData } from "../Columns/Columns";
import "../NewModels/NewModels.css";
import GlobalFilter from "./GlobalFilter";
import { BsArrowDownUp } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import "../../Full.css";
import { motion } from "framer-motion";

function AllModels() {
  const { id } = useParams();
  const [Data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [action, setAction] = useState(false);
  const [remainingDays, setRemainingDays] = useState(null);
  console.log(remainingDays);
  const handleActionClick = (id) => {
    setSelectedRow(id);
    setAction(!action);
  };
  const fetchData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/register`);
    setData(response.data);
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const columns = useMemo(() => AllModelsData, []);
  const data = useMemo(() => {
    const filteredData = Data.filter((row) => !row.isDeleted);
    return filteredData
      .filter((row) =>
        row.fullName.toLowerCase().includes(globalFilter.toLowerCase())
      )
      .map((row) => {
        const plan = row.paymentStatus === "success" ? row.paymentType : "";
        const remainingDays = Math.ceil(
          (new Date(row.planEndDate) - new Date()) / (1000 * 60 * 60 * 24)
        );
        setRemainingDays(Math.max(0, remainingDays));
        const planstat = Data.find((data) => data.userId === row.userId);
        const planstatuss = planstat
          ? remainingDays <= 0
            ? "Expired"
            : "Not Expired"
          : "";

        return {
          ...row,
          paymentType: plan,
          planEndDate: planstatuss,
        };
      });
  }, [Data, globalFilter]);
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            Cell: ({ row }) => (
              <Checkbox
                {...row.getToggleRowSelectedProps()}
                className="flex items-center h-[15px] w-[15px]"
              />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/user/register/stage1/delete/${id}`)
      .then((res) => {
        console.log(res);
        setData(data.filter((row) => row.id !== id));
        fetchData();
      });
  };

  const handleTrash = (id) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/user/register/ModelTrash/${id}`)
      .then(() => fetchData());
  };

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
    selectedFlatRows,
    getToggleAllRowsSelectedProps,
  } = tableInstance;
  const { pageIndex, pageSize } = state;

  const deleteSelectedRows = () => {
    const selectedIds = selectedFlatRows.map((row) => row.original._id);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/user/register/stage1/deletemultiple`, {
        data: { ids: selectedIds },
      })
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((err) => console.error(err));
  };

  return (
    <motion.div
      className=""
      initial={{y:-20,opacity:0.1}} animate={{y:0,opacity:1}} transition={{duration:0.2}}
    >
      <div className="bg-[white] rounded-[0.4rem] shadow-lg flex flex-col gap-[20px] px-[20px] py-[20px] overflow-x-scroll scroll">
        <h className="font-semibold sticky left-0 tracking-wider ">
          All Models
        </h>
        <div className="flex gap-2 items-center sticky left-0">
          <Checkbox
            {...getToggleAllRowsSelectedProps()}
            className="h-[15px] w-[15px] flex items-center"
            id="check"
          />
          <label htmlFor="check" className="cursor-pointer font-fair">Select all</label>
          <button
            onClick={deleteSelectedRows}
            className="bg-black/30 shadow-md  rounded-[0.1rem] font-semibold text-[14px] px-[5px] py-[2px] "
          >
            Delete Permenently
          </button>
        </div>

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
        <table {...getTableProps()} className="text-center text-[14px] ">
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
                    className="py-[13px] bg-[white] border-[1px]"
                  >
                    <div className="flex items-center justify-center gap-[5px]">
                      <span> {column.render("Header")}</span>
                      <span className="text-[8px]">
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
            {page.map((row, id) => {
              prepareRow(row, id);
              return (
                <tr {...row.getRowProps()} className="table-row">
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
                        className=" hover:text-[#4077B5] hover:duration-300 px-[20px] py-[2px] capitalize border-[1px]"
                      >
                        <span>{cell.render("Cell")}</span>
                      </td>
                    );
                  })}
                  <td className="border-[1px] relative">
                    <div className="flex flex-col gap-[10px]">
                      <div className="flex justify-center w-[200px]">
                        <div
                          onClick={() => handleActionClick(id)}
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
                      {selectedRow === id && action && (
                        <div className="flex justify-center absolute top-[10px] right-[135px]">
                          <div className="bg-white shadow-md px-[10px] py-[10px] rounded-[0.2rem] w-[170px] gap-[13px] text-[14px] flex flex-col items-start">
                            <div className="flex gap-[10px] items-center">
                              <span>
                                <GrView />
                              </span>
                              <Link
                                to={`/admin/home/ViewModel/${row.original._id}`}
                              >
                                View
                              </Link>
                            </div>
                            <div className="flex gap-[10px] items-center">
                              <span className="text-[red]">
                                <AiFillDelete />
                              </span>
                              <button
                                onClick={() => handleDelete(row.original._id)}
                              >
                                Permenently Delete
                              </button>
                            </div>
                            <div className="flex gap-[10px] items-center">
                              <span className="text-[green]">
                                <FaTrashAlt />
                              </span>
                              <button
                                onClick={() => handleTrash(row.original._id)}
                              >
                                Trash
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
                    {...column.getFooterProps}
                    className="font-semibold  px-[10px] py-[13px] bg-[white] border-[1px] "
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
              className="bg-[black] w-[60px] h-[20px] rounded-[0.1rem] font-fair flex justify-center items-center text-[14px] font-semibold text-white"
            >
              PREV
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="bg-[black] w-[60px] h-[20px] rounded-[0.1rem] font-fair flex justify-center items-center text-[14px] font-semibold text-white"
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
    </motion.div>
  );
}

export default AllModels;
