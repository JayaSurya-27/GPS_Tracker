import bellImage from "./assets/bell.png";

const Testing = () => {
  function handleActivityNotification() {
    // setTimeout(() => {
    //   if (Notification in window && Notification.permission === "granted") {
    //     let notification = new Notification(`${activity.data.name}`, {
    //       body: `After all the ${workTimeDuration} minutes of hardwork, your body deserves a ${activity.data.duration} minutes ${activity.data.name}`,
    //       icon: bellImage,
    //     });
    //   } else {
    //     toast.success(
    //       `After all the ${workTimeDuration} minutes of hardwork, your body deserves a ${activity.data.duration} minutes ${activity.data.name}`,
    //       {
    //         position: "top-right",
    //         autoClose: 3000,
    //       }
    //     );
    //   }
    // }, workTimeDuration * 60 * 1000);
  }

  return (
    <div>
      <h1>Testing</h1>
    </div>
  );
};

export default Testing;
