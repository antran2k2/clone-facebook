import moment from 'moment';

export const calculateTimeDifference = (createdTime: string) => {
  // Chuyển đổi thời gian tạo thành đối tượng moment
  const createdMoment = moment(createdTime);

  // Lấy thời điểm hiện tại
  const currentMoment = moment();

  // Tính thời gian chênh lệch
  const timeDifference = moment.duration(currentMoment.diff(createdMoment));

  // Xử lý các trường hợp cụ thể
  if (timeDifference.asMinutes() < 1) {
    return 'Vừa xong';
  } else if (timeDifference.asMinutes() < 60) {
    return `${Math.floor(timeDifference.asMinutes())} phút trước`;
  } else if (timeDifference.asHours() < 24) {
    return `${Math.floor(timeDifference.asHours())} giờ trước`;
  } else if (timeDifference.asDays() < 31) {
    return `${Math.floor(timeDifference.asDays())} ngày trước`;
  } else if (timeDifference.asMonths() < 12) {
    return `${Math.floor(timeDifference.asMonths())} tháng trước`;
  } else {
    return `${Math.floor(timeDifference.asYears())} năm trước`;
  }
};
export function convertStringToBoolean(obj) {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key] === '1' ? true : false;
    }
  }
  return result;
}
export function convertBooleanToString(obj) {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key] ? '1' : '0';
    }
  }
  return result;
}
