import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination, useSortBy, useRowSelect } from "react-table";
import axios from "axios";
import { NewModelData } from "../Columns/Columns";
import "../NewModels/NewModels.css";
import { AiFillSetting } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import "../../Full.css";
import {motion} from"framer-motion"
import { VscLayersActive } from "react-icons/vsc";

function NewModels() {
  const { id } = useParams();
  const [Data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [action, setAction] = useState(false);
  const handleActionClick = (id) => {
    setSelectedRow(id);
    setAction(!action);
  };
  const fetchData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/register`);
    setData(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const columns = useMemo(() => NewModelData, []);
  const data = useMemo(() => {
    const filteredData = Data.filter((row) => !row.isDeleted && row.newmodel);
    return filteredData.map((row) => {
      return {
        ...row,
      };
    });
  }, [Data]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination,
    useRowSelect
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

  const handleAccept = (id) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/user/register/accept/newmodel/${id}`)
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
  } = tableInstance;
  const { pageIndex, pageSize } = state;

  return (
    <motion.div initial={{y:-50,opacity:0}} animate={{y:0,opacity:1}} transition={{ duration: 0.3 }} className="">
      <div className="bg-[white] rounded-[0.4rem] shadow-lg flex flex-col gap-[20px] px-[20px] py-[20px] overflow-x-scroll scroll">
        <h className="font-semibold sticky left-0 tracking-wider ">
          New Models
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
                    <span> {column.render("Header")}</span>
                  </th>
                ))}
                <th className="border-[1px] hover:bg-white">Action</th>
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
                        <div className="z-[999] flex justify-center absolute top-[40px] right-[120px]">
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
                              <span>
                                <VscLayersActive />
                              </span>
                              <button onClick={()=>handleAccept(row.original._id)}>Approved</button>
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
          <tfoot className="">
            {footerGroups.map((footerGroup) => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((column) => (
                  <td
                    {...column.getFooterProps}
                    className="font-semibold   px-[10px] py-[13px] bg-[white] border-[1px] "
                  >
                    <span>{column.render("Footer")}</span>
                  </td>
                ))}
                <th className="border-[1px] ">Action</th>
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
              className="bg-[black] w-[60px] h-[20px] rounded-[0.1rem] flex justify-center items-center text-[14px] font-semibold font-fair text-white"
            >
              PREV
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="bg-[black] w-[60px] h-[20px] rounded-[0.1rem] flex justify-center items-center text-[14px] font-semibold font-fair text-white"
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

export default NewModels;
