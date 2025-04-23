import db from '../src/db.js';

const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = val => (val * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

const addSchool = async (req, res) => {

    try {

        const { name, latitude, longitude, address } = req.body;

        if (!name || !latitude || !longitude || !address) {
            return res.status(400).json({ message: 'All fields are required!' })
        }

        const query = 'INSERT INTO schools ( name, latitude, longitude, address) VALUES ( ?, ?, ?, ?)';
        const [result] = await db.execute(query, [name, latitude, longitude, address]);

        res.json({
            message: 'School added successfully!',
            schoolId: result.insertId
        });


    } catch (error) {
        console.error("Add School Error →", error);
        res.status(500).json({ message: 'error adding school' })
    }
};

export { addSchool };

export const listSchools = async (req, res) => {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    if (isNaN(userLat) || isNaN(userLon)) {
        return res.status(400).json({ message: 'Invalid coordinates' });
    }

    try {
        const [results] = await db.execute('SELECT * FROM schools');

        const sorted = results.map(school => {
            const distance = haversineDistance(userLat, userLon, school.latitude, school.longitude);
            return { ...school, distance };
        }).sort((a, b) => a.distance - b.distance);

        res.json(sorted);
    } catch (err) {
        console.error("List Schools Error →", err);
        res.status(500).json({ message: 'Error fetching schools' });
    }
};
