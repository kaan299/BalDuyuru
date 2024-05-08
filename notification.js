import {collection, getDocs, query, where} from "firebase/firestore";
import {database} from "./firebase";

export default async function sendPushNotification(announcement) {
    let q = query(collection(database, 'devices'));
    if (announcement.facultyId && announcement.departmentId) {
        q = query(collection(database, 'devices'),
            where("facultyId", "==", announcement.facultyId),
            where("departmentId", "==", announcement.departmentId));
    } else if (announcement.facultyId) {
        q = query(collection(database, 'devices'),
            where("facultyId", "==", announcement.facultyId));
    }

    getDocs(q).then(snapshot => {
        const devices = snapshot.docs.map(x => x.data());
        console.log(devices);
        for (let i = 0; i <= devices.length; i++) {
            const device = devices[i];
            const message = {
                to: device.token,
                sound: 'default',
                title: announcement.title,
                body: announcement.content
            };

            fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });
        }
    });
}