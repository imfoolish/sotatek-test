import { useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";

const SimpleDatePicker = () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const startDateIndex = new Date(year, month - 1, 1).getDay();
  const [pickedDay, setPickedDay] = useState(
    new Date(now.getFullYear(), now.getMonth(), now.getDate())
  );
  console.log(startDateIndex);

  const { ref, isComponentVisible, setIsComponentVisible } = useClickOutside();
  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const isLeapYear = (year) => {
    if (year % 4 || (year % 100 === 0 && year % 400)) return true;
    return false;
  };

  const getNumberDayOfMonth = (month) => {
    switch (month) {
      case 2:
        return isLeapYear(year) ? 29 : 28;
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return 31;
      default:
        return 30;
    }
  };

  const getWeeksInMonth = () =>
    (getNumberDayOfMonth(month - 1) + startDateIndex) % daysOfWeek.length === 0
      ? (getNumberDayOfMonth(month - 1) + startDateIndex) / daysOfWeek.length
      : parseInt(
          (
            (getNumberDayOfMonth(month - 1) + startDateIndex) /
            daysOfWeek.length
          ).toFixed()
        ) + 1;

  const renderDay = (week, day) => {
    if (week === 0) {
      if (day < startDateIndex) {
        return 0;
      } else {
        return 7 * week + day + 1 - startDateIndex;
      }
    } else if (week === getWeeksInMonth() - 1) {
      if (7 * week + day + 1 - startDateIndex > getNumberDayOfMonth(month)) {
        return 0;
      } else {
        return 7 * week + day + 1 - startDateIndex;
      }
    } else {
      return 7 * week + day + 1 - startDateIndex;
    }
  };

  const handleChangeMonth = (type) => {
    if (type === "decrease") {
      if (month === 1) {
        setMonth(12);
        setYear(year - 1);
      } else {
        setMonth(month - 1);
      }
    } else {
      if (month === 12) {
        setMonth(1);
        setYear(year + 1);
      } else {
        setMonth(month + 1);
      }
    }
  };

  return (
    <>
      <input
        type="text"
        value={`${pickedDay.getDate()}/${
          pickedDay.getMonth() + 1
        }/${pickedDay.getFullYear()}`}
      />
      <button
        onClick={(e) => {
          setIsComponentVisible(!isComponentVisible);
        }}
      >
        Xem
      </button>
      <div
        ref={ref}
        className="picker"
        style={{
          border: isComponentVisible ? "1px solid black" : "none",
          marginTop: "5px",
          padding: "5px",
        }}
      >
        {isComponentVisible && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                transition: "ease-in",
              }}
            >
              <div>
                <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                  Tháng {month}, {year}
                </span>
              </div>
              <div>
                <a
                  style={{ cursor: "pointer", fontWeight: "700" }}
                  onClick={() => handleChangeMonth("decrease")}
                >
                  &#60;
                </a>
                <a
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                  onClick={() => handleChangeMonth("increase")}
                >
                  &#62;
                </a>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "5px",
              }}
            >
              {daysOfWeek.map((day) => (
                <button
                  style={{
                    textAlign: "left",
                    border: "none",
                    backgroundColor: "#fff",
                    fontWeight: "bold",
                    fontSize: "12px",
                    width: "28px",
                  }}
                >
                  {day}
                </button>
              ))}
            </div>
            {[...Array(getWeeksInMonth()).keys()].map((week) => (
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {daysOfWeek.map((day, index) => {
                  return (
                    <>
                      {renderDay(week, index) !== 0 ? (
                        <button
                          style={{
                            border: "none",
                            backgroundColor:
                              new Date(
                                year,
                                month - 1,
                                renderDay(week, index)
                              ).getTime() === pickedDay.getTime()
                                ? "rgb(0, 127, 255)"
                                : "#fff",
                            color:
                              new Date(
                                year,
                                month - 1,
                                renderDay(week, index)
                              ).getTime() === pickedDay.getTime()
                                ? "#fff"
                                : "#000",
                            fontWeight: "bold",
                            fontSize: "12px",
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            padding: "7px 4px",
                            margin: "1px 0px",
                          }}
                          disabled={
                            new Date(year, month - 1, renderDay(week, index)) <
                            today
                          }
                          onClick={() => {
                            setIsComponentVisible(false);
                            setPickedDay(
                              new Date(year, month - 1, renderDay(week, index))
                            );
                          }}
                        >
                          {renderDay(week, index)}
                        </button>
                      ) : (
                        <button
                          style={{
                            width: "28px",
                            height: "28px",
                            visibility: "hidden",
                          }}
                        />
                      )}
                    </>
                  );
                })}
                <br />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default SimpleDatePicker;
