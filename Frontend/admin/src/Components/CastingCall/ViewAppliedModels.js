import React, { useMemo, useState, useEffect, useContext } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useRowSelect,
} from "react-table";
import { Checkbox } from "../Checkbox/Checkbox";
import axios from "axios";
import { ViewCastingModelData } from "../Columns/Columns";
import "../NewModels/NewModels.css";
import GlobalFilter from "../AllModels/GlobalFilter";
import { BsArrowDownUp } from "react-icons/bs";
import { useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SidebarContext } from "../../Hooks/Context";

function ViewAppliedModels() {
  const { setFilter } = useContext(SidebarContext);
  const { id } = useParams();
  const [Data, setData] = useState([]);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/client/register/castingcalls/${id}`
      );
      setTitle(response.data.title);
      setData(response.data.users);
    };
    fetchData();
  }, [id]);

  const columns = useMemo(() => ViewCastingModelData, []);
  const data = useMemo(() => {
    const filter = Data.filter((data) => data.fullName);
    console.log(filter.length);
    setFilter(filter.length);
    return filter;
  }, [Data,setFilter]);
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
    setGlobalFilter,
    gotoPage,
    setPageSize,
    footerGroups,
    pageCount,
    state,
    getToggleAllRowsSelectedProps,
  } = tableInstance;
  const { pageIndex, pageSize, globalFilter } = state;

  return (
    <motion.div
      className=""
      initial={{ y: -20, opacity: 0.1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-[white] rounded-[0.4rem] shadow-lg flex flex-col gap-[20px] px-[20px] py-[20px] overflow-x-scroll scroll">
        <div className="flex flex-col md:flex-row gap-[20px]">
          <h className="font-semibold font-fair sticky left-0 tracking-wider ">
            View Castingcall Models:-
          </h>
          <span className="text-[18px] font-fair tracking-wider text-center">
            {title}
          </span>
        </div>

        <div className="flex gap-2 items-center sticky left-0">
          <Checkbox
            {...getToggleAllRowsSelectedProps()}
            className="h-[15px] w-[15px] flex items-center"
          />
          <span>Select all</span>
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
        <table {...getTableProps()} className="text-center text-[14px]">
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
                        className=" hover:text-[#4077B5] hover:duration-300 px-[20px] py-[20px] capitalize border-[1px] "
                      >
                        <span>{cell.render("Cell")}</span>
                      </td>
                    );
                  })}
                  <td className="border-[1px]">
                    <div className="flex items-center w-[100px] gap-[20px] justify-center">
                      <span className="text-[18px] text-[red]">
                        <AiFillDelete />
                      </span>
                      <Link
                        to={`/admin/home/ViewModel/${row.original._id}`}
                        className=""
                      >
                        <VisibilityIcon />
                      </Link>
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
                <th className="border-[2px]">Action</th>
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

export default ViewAppliedModels;
