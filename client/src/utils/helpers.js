// module.exports = {
//     // the helper method 'format_time' will take in a timestamp and return a string with only the date
//     format_time: (date) => {
//       // uses the toLocaleDateString() method to format the date as MM/DD/YYYY
//       return date.toLocaleDateString();

//     }
//   };

export default function formatTime(date) {
  return new Date(date).toLocaleDateString();
}