import { useEffect, useRef, useState } from "react";
import Card from "./Card";

import {
  BarControllerChartOptions,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  CoreChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  Legend,
  LinearScale,
  PluginChartOptions,
  ScaleChartOptions,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { _DeepPartialObject } from "chart.js/dist/types/utils";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const dayInMonth = new Array(30).fill(0);
const monthInYear = Array.from({ length: 12 }, (_, i) => {
  return new Date(0, i).toLocaleString("en-US", { month: "short" });
});

const CaregiverChart: React.FC = () => {
  const [monthset, setMonthset] = useState(-1);
  const currentDate1 = new Date();
  const today = currentDate1.getDate();

  // Create an array with the days of the current month up to today's date
  const daysArray = Array.from({ length: today }, (_, i) => i + 1);
  const dayInMonth = Array.from(
    { length: new Date(0, monthset, 0).getDate() },
    (_, i) => {
      return i + 1;
    }
  );

  const options: _DeepPartialObject<
    CoreChartOptions<"bar"> &
      ElementChartOptions<"bar"> &
      PluginChartOptions<"bar"> &
      DatasetChartOptions<"bar"> &
      ScaleChartOptions<any> &
      BarControllerChartOptions
  > = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "",
      },
    },
  };

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  const getActiveClass = (index: number, className: string) =>
    toggleState === index ? className : "";

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentDay, setCurrentDay] = useState(new Date());

  const [dailyStat, setDailyStat] = useState({});
  const [monthlyStat, setMonthlyStat] = useState({});

  const [showDatePicker, setShowDatePicker] = useState(false);

  const datePickerRef = useRef<HTMLInputElement>(null);
  const handleDatePickerClick = () => setShowDatePicker(!showDatePicker);

  useEffect(() => {
    const onPickerShow = () => setShowDatePicker(false);
    if (showDatePicker) {
      datePickerRef.current?.showPicker();
      document.getElementById("root")?.addEventListener("click", onPickerShow);
    } else {
      datePickerRef.current?.blur();
      document
        .getElementById("root")
        ?.removeEventListener("click", onPickerShow);
    }
    return () =>
      document
        .getElementById("root")
        ?.removeEventListener("click", onPickerShow);
  }, [showDatePicker]);

  useEffect(() => {
    if (showDatePicker) datePickerRef.current?.showPicker();
    else datePickerRef.current?.blur();
  }, [showDatePicker]);

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth((newDate.getMonth() + 12 - 1) % 12);
    newDate.setFullYear(
      newDate.getMonth() === 11
        ? newDate.getFullYear() - 1
        : newDate.getFullYear()
    );
    setCurrentDate(newDate);
  };

  const handleNextMonth = () =>
    setCurrentDate((prevDate) => {
      prevDate = new Date(currentDate);
      prevDate.setMonth((prevDate.getMonth() + 1) % 12);
      prevDate.setFullYear(
        prevDate.getMonth() === 0
          ? prevDate.getFullYear() + 1
          : prevDate.getFullYear()
      );
      return prevDate;
    });

  const handleNextYear = () => {
    setCurrentDay((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(newDate.getFullYear() + 1);
      return newDate;
    });
  };

  const handlePrevYear = () => {
    setCurrentDay((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(newDate.getFullYear() - 1);
      return newDate;
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentDate(new Date(e.target.value));

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentDay(new Date(e.target.value));

  const formattedDate = currentDate.toLocaleString("default", {
    year: "numeric",
    month: "long",
  });

  const formattedDay = currentDay.toLocaleString("default", {
    year: "numeric",
    month: "long",
  });

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/patients?dateAdded_gte=${currentDay.getFullYear()}-01-01T00:00:00.000&dateAdded_lte=${currentDay.getFullYear()}-12-31T00:00:00.000`
    )
      .then((res) => res.json())
      .then((data) => {
        setMonthlyStat(
          data
            .map((r: { dateAdded: string | number | Date }) =>
              new Date(r.dateAdded).getMonth()
            )
            .reduce((acc: any, curr: string | number) => {
              const prev = [...acc];
              prev[curr]++;
              return prev;
            }, new Array(12).fill(0))
        );
      })
      .catch((e) => console.log(e));
  }, [currentDay]);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");

    const today = currentDate.getDate();

    // Create an array with the days of the current month up to today's date
    const daysArray = Array.from({ length: today }, (_, i) => i + 1);

    setMonthset(currentDate.getMonth() + 1);
    const startDate = `${year}-${month}-01T00:00:00.000`;
    const endDate = `${year}-${month}-${new Date(
      year,
      currentDate.getMonth() + 1,
      0
    ).getDate()}T23:59:59.999`;

    fetch(
      `http://localhost:5000/api/patients?dateAdded_gte=${startDate}&dateAdded_lte=${endDate}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDailyStat(
          data
            .map((r: { dateAdded: string | number | Date }) =>
              new Date(r.dateAdded).getDate()
            )
            .reduce((acc: any, curr: number) => {
              const prev = [...acc];
              prev[curr - 1]++;
              return prev;
            }, new Array(monthset).fill(0))
        );
      })
      .catch((e) => console.log(e));
  }, [currentDate]);

  const dayWisedata = {
    // labels: new Array(30).fill(0).map((_, i) => i + 1),
    labels: dayInMonth,
    datasets: [
      {
        label: "Monthwise Caregiver list",
        data: dailyStat,
        backgroundColor: "#006b56",
        borderColor: "#006b56",
        borderWidth: 1,
      },
    ],
  };

  const monthWisedata = {
    labels: monthInYear,
    datasets: [
      {
        label: "Yearly Caregiver list",
        data: monthlyStat,
        backgroundColor: "#006b56",
        borderColor: "#006b56",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="my-3">
      <ul className="nav nav-tabs justify-content-center">
        <li className="nav-item">
          <button
            className={`nav-link px-5 ${getActiveClass(1, "active")}`}
            onClick={() => toggleTab(1)}
          >
            Month
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link px-5 ${getActiveClass(2, "active")}`}
            onClick={() => toggleTab(2)}
          >
            Year
          </button>
        </li>
      </ul>
      <h6 className="text-center my-3">Registered Caregivers</h6>
      <div className="tab-content">
        <div
          tabIndex={1}
          className={`tab-pane fade ${getActiveClass(1, "active show")}`}
        >
          <div className="d-flex justify-content-between  py-2 px-3 position-relative cursor-pointer">
            <span onClick={handlePrevMonth}>
              <i className="fa-solid fa-angle-left"></i>
            </span>
            <span
              className="text-muted cursor-pointer"
              onClick={handleDatePickerClick}
            >
              {formattedDate}
            </span>
            <span className="visually-hidden position-absolute top-50 start-0 translate-middle">
              <input
                id="datePicker"
                ref={datePickerRef}
                type="date"
                value={currentDate?.toISOString().split("T")[0]}
                onChange={handleDayChange}
              />
            </span>
            <span onClick={handleNextMonth}>
              <i className="fa-solid fa-angle-right"></i>
            </span>
          </div>
          <Bar data={dayWisedata} options={options}></Bar>
        </div>
        <div
          tabIndex={2}
          className={`tab-pane fade ${getActiveClass(2, "active show")}`}
        >
          <div className="d-flex justify-content-between  py-2 px-3 position-relative cursor-pointer">
            <span onClick={handlePrevYear}>
              <i className="fa-solid fa-angle-left"></i>
            </span>
            <span
              className="text-muted cursor-pointer"
              onClick={handleDatePickerClick}
            >
              {formattedDay}
            </span>
            <span className="visually-hidden position-absolute top-50 start-0 translate-middle">
              <input
                id="datePicker"
                ref={datePickerRef}
                type="date"
                value={currentDay?.toISOString().split("T")[0]}
                onChange={handleDateChange}
              />
            </span>
            <span onClick={handleNextYear}>
              <i className="fa-solid fa-angle-right"></i>
            </span>
          </div>
          <Bar data={monthWisedata} options={options}></Bar>
        </div>
      </div>
    </Card>
  );
};

export default CaregiverChart;
