function timeToMinutes(timeStr) {
  try {
    if (!timeStr || typeof timeStr !== "string") {
      throw new Error("Time value is missing");
    }

    const parts = timeStr.split(":");
    if (parts.length !== 2) {
      throw new Error("Invalid time format");
    }

    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);

    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59
    ) {
      throw new Error("Invalid time value");
    }

    return hours * 60 + minutes;
  } catch (error) {
    throw error;
  }
}

function processAttendance(input) {
  let result = {
    employeeId: input?.employeeId ?? null,
    date: input?.date ?? null,
    status: "error",
    totalWorkingMinutes: 0,
    overtimeMinutes: 0,
    note: "",
    errorMessage: null
  };

  try {
    const {
      checkIn,
      checkOut,
      breakStart,
      breakEnd,
      overtimeApproved
    } = input;

   
    if (!checkIn || !checkOut) {
      result.status = "incomplete";
      result.note = "Check-in or check-out missing";
      return result;
    }

    const checkInMinutes = timeToMinutes(checkIn);
    const checkOutMinutes = timeToMinutes(checkOut);

    let breakDuration = 0;

   
    if (breakStart) {
      const breakStartMin = timeToMinutes(breakStart);

      if (breakEnd) {
        const breakEndMin = timeToMinutes(breakEnd);
        breakDuration = breakEndMin - breakStartMin;
      } else {
        
        breakDuration = 30;
      }

      if (breakDuration < 0) {
        throw new Error("Invalid break time");
      }
    }

    let totalWorkingMinutes =
      checkOutMinutes - checkInMinutes - breakDuration;

    if (totalWorkingMinutes < 0) {
      result.status = "invalid";
      result.note = "Total working time is negative";
      result.totalWorkingMinutes = 0;
      return result;
    }

    result.totalWorkingMinutes = totalWorkingMinutes;
    result.status = "complete";
    result.note = "Attendance processed successfully";

   
    if (overtimeApproved === true && totalWorkingMinutes > 480) {
      result.overtimeMinutes = totalWorkingMinutes - 480;
    }

    return result;
  } catch (error) {
    result.status = "error";
    result.errorMessage = error.message;
    result.note = "Error occurred while processing attendance";
    return result;
  } finally {
    console.log("Attendance processed successfully");
  }
}



const attendanceInput = {
  employeeId: "EMP101",
  date: "2025-12-12",
  checkIn: "09:00",
  checkOut: "18:15",
  breakStart: "13:00",
  breakEnd: "13:30",
  overtimeApproved: true
};

console.log(processAttendance(attendanceInput));
