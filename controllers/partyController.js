const { prisma } = require('../prisma/prisma.js');

exports.getGenderList = async (req, res) => {
    try {
        const result = await prisma.oPT_Party.groupBy({
            by: ['PTY_Gender'],
            _count: {
                PTY_Gender: true,
            },
        });

        // Format to match previous output: [{ gender: 'Male', count: 20 }]
        const formatted = result.map(item => ({
            gender: item.PTY_Gender,
            count: item._count.PTY_Gender
        }));

        res.json(formatted);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.findCountOfGender = async (req, res) => {
    const { gender } = req.params;
    try {
        const count = await prisma.oPT_Party.count({
            where: {
                PTY_Gender: gender
            }
        });
        res.json({ count });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getClientsForAge = async (req, res) => {
    const { lowAge, highAge, gender } = req.query;

    if (!lowAge || !highAge) {
        return res.status(400).json({ error: "lowAge and highAge are required" });
    }

    try {
        const whereClause = {
            PTY_Age: {
                gte: parseInt(lowAge),
                lt: parseInt(highAge)
            }
        };

        if (gender) {
            whereClause.PTY_Gender = gender;
        }

        const clients = await prisma.oPT_Party.findMany({
            where: whereClause,
            select: {
                PTY_FirstName: true,
                PTY_LastName: true,
                PTY_Phone: true,
                PTY_SSN: true,
                PTY_Age: true,
                PTY_Gender: true
            }
        });

        // Map to camelCase if frontend expects it
        const formatted = clients.map(client => ({
            firstName: client.PTY_FirstName,
            lastName: client.PTY_LastName,
            phone: client.PTY_Phone,
            ssn: client.PTY_SSN,
            age: client.PTY_Age,
            gender: client.PTY_Gender
        }));

        res.json(formatted);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
