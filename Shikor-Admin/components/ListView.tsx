import { useState } from "react";

import Card from "./Card";
import Filter from "./Icons/Filter";
import PatientEdit from "./PatientEditPopUp";
import SITEMAP from "./SITEMAP";

export type ListViewElement = {
  id: number;
  name: string;
  dateAdded: string;  
  deviceId?: string;
  token?: string;
  caregiverName?: string;
  caregivers: { id: number; name: string }[];
};

interface Props {
  items: ListViewElement[];
  sortKeys?: (keyof ListViewElement)[];
  sos?: boolean;
  loading?: boolean;
}

const ListView: React.FC<Props> = ({ items, sos, sortKeys, loading }) => {
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const toggleFilterDropdown = () =>
    setFilterDropdownOpen((dropdownOpen) => !dropdownOpen);

  const [search, setSearch] = useState("");
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setSearch(e.target.value);

  const [sortAsc, setSortAsc] = useState(true);
  const [sortBy, setSortBy] = useState<keyof ListViewElement>("name");
  const onSortByChange = (s: typeof sortBy) => () => {
    if (sortBy === s) setSortAsc((sortAsc) => !sortAsc);
    else setSortAsc(true);
    setSortBy(s);
    setFilterDropdownOpen(false);
  };

  const [profilePopupId, setProfilePopupId] = useState(-1);

  return (
    <>
      <PatientEdit
        show={profilePopupId !== -1}
        href={SITEMAP.editdetails + `?id=` + profilePopupId}
        onClose={() => setProfilePopupId(-1)}
        patientEditId={profilePopupId}
      />
      <div className="row">
        <div className="col-8">
          <div className="input-group my-2">
            <span className="input-group-text bg-light border-0">
              <i className="fa fa-search" />
            </span>
            <div className="form-floating">
              <input
                type="text"
                className="form-control border-start-0"
                id="search"
                placeholder="Search ID"
                value={search}
                onChange={onInputChange}
              />
              <label htmlFor="search">Search ID</label>
            </div>
          </div>
        </div>
        <div className="col-4 d-flex align-items-center justify-content-end">
          <div className="dropdown">
            <button
              onClick={toggleFilterDropdown}
              data-bs-toggle="dropdown"
              aria-expanded={filterDropdownOpen}
              className="btn d-flex align-items-center ms-auto"
            >
              Sort By
              <div
                className="d-flex flex-column align-items-center ms-2"
                style={{ width: 25 }}
              >
                {Filter}
              </div>
            </button>
            <ul
              className={`dropdown-menu end-0 border-0 shadow ${
                filterDropdownOpen ? "show" : ""
              }`}
            >
              {(sos && sortKeys
                ? sortKeys
                : (["id", "name", "dateAdded"] as (keyof ListViewElement)[])
              ).map((key) => (
                <li key={key}>
                  <button
                    onClick={onSortByChange(key)}
                    className={`dropdown-item text-end ${
                      key === sortBy ? "fw-bold" : ""
                    }`}
                  >
                    {key === sortBy && (
                      <i
                        className={`fa ${
                          sortAsc ? "fa-angle-up" : "fa-angle-down"
                        }`}
                      />
                    )}
                    {`${key[0].toUpperCase()}${key.slice(1)}`}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {loading ? (
        <>Loading</>
      ) : (
        items
          .filter(({ id, name }) =>
            [id, name].find(
              (item) =>
                item.toString().toLowerCase().includes(search.toLowerCase())
            )
          )
          .sort((a, b) => {
            let result = 0;
            if (typeof a[sortBy] === "string")
              result = (a[sortBy] as string).localeCompare(b[sortBy] as string);
            if (typeof a[sortBy] === "number")
              result = (a[sortBy] as number) - (b[sortBy] as number);
            // if (a[sortBy] instanceof Date)
            //   result =
            //     a[sortBy]! > b[sortBy]! ? 1 : a[sortBy] === b[sortBy] ? 0 : -1;

            return result * (sortAsc ? 1 : -1);
          })
          .map(({ name, id, dateAdded, caregivers }) => (
            <Card
              className="mt-3 py-2"
              key={id}
              role="button"
              onClick={() => setProfilePopupId(id)}
            >
              <table className="table mb-0">
                <tbody className="border-white">
                  <tr className="text-primary h5">
                    <td className="align-top">
                      <strong className="ps-0">{name}</strong>
                      <br />
                    </td>
                    <td className="text-end align-top">
                      {dateAdded.slice(0, 10)}
                    </td>
                  </tr>
                  <tr className="text-muted">
                    {(sos && (
                      <td className="align-top">
                        {caregivers?.map((givername, i) => givername.name)}
                      </td>
                    )) || <td className="align-top">ID : {id}</td>}
                    <td className="text-end align-top">
                      Device ID :{" "}
                     
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
          ))
      )}
    </>
  );
};

export default ListView;
