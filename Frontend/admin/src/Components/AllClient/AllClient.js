import React, { useMemo, useState, useEffect } from "react";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useSortBy,
} from "react-table";
import { AllClientData } from "../Columns/Columns";
import GlobalFilter from "../AllModels/GlobalFilter";
import { BsArrowDownUp } from "react-icons/bs";
import "../SideBar/Scroll.css";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {Link} from "react-router-dom"
import {motion} from "framer-motion"

function AllClient() {
  const [datas, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/register`
    );
    setData(response.data)
    
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = useMemo(() => AllClientData, []);
  const data = useMemo(() => {
    return datas
      .filter((row) =>
        row.fullname.toLowerCase().includes(globalFilter.toLowerCase())
      )
  },[datas, globalFilter]);
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
  return (
    <motion.div initial={{y:-50,opacity:0}} animate={{y:0,opacity:1}} transition={{ duration: 0.3 }} className="bg-[#f1f6fa] ">
      <div className="bg-[white] rounded-[0.4rem] shadow-md flex flex-col gap-[20px] px-[20px] py-[20px] overflow-x-scroll scroll">
        <h className="font-semibold sticky left-0 tracking-wider ">
          All Clients
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
                    className="tracking-wide px-[10px] py-[13px] bg-[white] border-[1px] "
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
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
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
                        className="px-[10px] py-[20px] border-[1px] "
                      >
                        <span>{cell.render("Cell")}</span>
                      </td>
                    );
                  })}
                  <td className="border-[1px]">
                    <Link to={`/admin/home/ViewClient/${row.original._id}`} className="flex justify-center items-center gap-[5px]">
                    <span><VisibilityIcon /></span>
                      <span>View</span>
                      
                    </Link>
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

export default AllClient;
