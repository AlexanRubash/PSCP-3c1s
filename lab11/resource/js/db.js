class DB {
    constructor(pool) {
        this.connectionPool = pool;
        //console.log("Мы подключились к БД")
    }


    executeQueryByEndpoint(endpointWithMethod, data) {
        switch (endpointWithMethod) {

            case 'GET: /api/faculties':
                return this.getFaculties();
            case 'GET: /api/pulpits':
                return this.getPulpits();
            case 'GET: /api/subjects':
                return this.getSubjects();
            case 'GET: /api/auditoriumstypes':
                return this.getAuditoriumsTypes();
            case 'GET: /api/auditoriums':
                return this.getAuditoriums();
            case 'GET: /api/faculty/xyz/pulpits':
                return this.getAuditoriums();

            case 'POST: /api/faculties':
                return this.postFaculties(data);
            case 'POST: /api/pulpits':
                return this.postPulpits(data);
            case 'POST: /api/subjects':
                return this.postSubjects(data);
            case 'POST: /api/auditoriumstypes':
                return this.postAuditoriumsTypes(data);
            case 'POST: /api/auditoriums':
                return this.postAuditoriums(data);

            case 'PUT: /api/faculties':
                return this.putFaculties(data);
            case 'PUT: /api/pulpits':
                return this.putPulpits(data);
            case 'PUT: /api/subjects':
                return this.putSubjects(data);
            case 'PUT: /api/auditoriumstypes':
                return this.putAuditoriumsTypes(data);
            case 'PUT: /api/auditoriums':
                return this.putAuditoriums(data);

            case 'DELETE: /api/faculties':
                return this.deleteFaculties(data);
            case 'DELETE: /api/pulpits':
                return this.deletePulpits(data);
            case 'DELETE: /api/subjects':
                return this.deleteSubjects(data);
            case 'DELETE: /api/auditoriumstypes':
                return this.deleteAuditoriumsTypes(data);
            case 'DELETE: /api/auditoriums':
                return this.deleteAuditoriums(data);


            default: {
                const endpointPattern1 = /^GET: \/api\/faculty\/.*\/pulpits$/;
                const endpointPattern2 = /^GET: \/api\/auditoriumtypes\/.*\/auditoriums$/;


                if (endpointPattern1.test(endpointWithMethod)) {

                    const regex = /\/faculty\/(.*?)\/pulpits/;
                    const match = endpointWithMethod.match(regex);

                    const data = decodeURIComponent(match[1]);

                    return this.getPulpitsByFaculty(data);
                }

                else if (endpointPattern2.test(endpointWithMethod)) {
                    const regex = /\/auditoriumtypes\/(.*?)\/auditoriums/;
                    const match = endpointWithMethod.match(regex);

                    const data = decodeURIComponent(match[1]);

                    return this.getAuditoriumsByType(data);
                }

                return Promise.reject('Not found');
            }
        }
    }


    async getFaculties() {
        return await this.connectionPool.request().query('SELECT * FROM FACULTY');
    }

    async getPulpits() {
        return await this.connectionPool.request().query('SELECT * FROM PULPIT');
    }

    async getSubjects() {
        return await this.connectionPool.request().query('SELECT * FROM SUBJECT');
    }

    async getAuditoriumsTypes() {
        return await this.connectionPool.request().query('SELECT * FROM AUDITORIUM_TYPE');
    }

    async getAuditoriums() {
        return await this.connectionPool.request().query('SELECT * FROM AUDITORIUM');
    }

    async getPulpitsByFaculty(data) {
        return await this.connectionPool.request().query(`SELECT PULPIT.PULPIT, PULPIT.PULPIT_NAME, PULPIT.FACULTY
                                                            FROM PULPIT INNER JOIN FACULTY
                                                            ON PULPIT.FACULTY = FACULTY.FACULTY
                                                            WHERE FACULTY.FACULTY = '${data}'`);
    }

    async getAuditoriumsByType(data) {
        return await this.connectionPool.request().query(`SELECT AUDITORIUM.AUDITORIUM_NAME, AUDITORIUM.AUDITORIUM_CAPACITY, AUDITORIUM.AUDITORIUM_TYPE
                                                            FROM AUDITORIUM INNER JOIN AUDITORIUM_TYPE
                                                            ON AUDITORIUM.AUDITORIUM_TYPE = AUDITORIUM_TYPE.AUDITORIUM_TYPE
                                                            WHERE AUDITORIUM_TYPE.AUDITORIUM_TYPE = '${data}'`);
    }


    //POST
    async postPulpits(data) {
        const pulpit = data.PULPIT;
        const pulpitName = data.PULPIT_NAME;
        const faculty = data.FACULTY;
        return await this.connectionPool.request()
            .query(`INSERT PULPIT(PULPIT, PULPIT_NAME, FACULTY) VALUES('${pulpit}', '${pulpitName}', '${faculty}')`);
    }

    async postSubjects(data) {
        const subject = data.SUBJECT;
        const subjectName = data.SUBJECT_NAME;
        const pulpit = data.PULPIT;
        return await this.connectionPool.request()
            .query(`INSERT SUBJECT(SUBJECT, SUBJECT_NAME, PULPIT) VALUES('${subject}', '${subjectName}', '${pulpit}')`);
    }

    async postAuditoriumsTypes(data) {
        const auditoriumType = data.AUDITORIUM_TYPE;
        const auditoriumTypeName = data.AUDITORIUM_TYPENAME;

        return await this.connectionPool.request()
            .query(`INSERT AUDITORIUM_TYPE(AUDITORIUM_TYPE, AUDITORIUM_TYPENAME) VALUES('${auditoriumType}', '${auditoriumTypeName}')`);
    }

    async postAuditoriums(data) {
        const auditorium = data.AUDITORIUM;
        const auditoriumName = data.AUDITORIUM_NAME;
        const auditoriumType = data.AUDITORIUM_TYPE;
        const auditoriumCapacity = +data.AUDITORIUM_CAPACITY;

        return await this.connectionPool.request()
            .query(`INSERT AUDITORIUM(AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) VALUES('${auditorium}', '${auditoriumName}', '${auditoriumType}', ${auditoriumCapacity})`);
    }


    //PUT
    async putFaculties(data) {
        const faculty = data.FACULTY;
        const facultyName = data.FACULTY_NAME;

        return await this.connectionPool.request()
            .query(`UPDATE FACULTY SET FACULTY_NAME = '${facultyName}' WHERE FACULTY = '${faculty}'`);
    }

    async putPulpits(data) {
        const pulpit = data.PULPIT;
        const pulpit_name = data.PULPIT_NAME;
        const faculty = data.FACULTY;

        const resp = await this.connectionPool.request().query(`SELECT * FROM PULPIT WHERE PULPIT = '${pulpit}'`);

        if (resp.recordset.length === 0) {
            return new Error('There are no record with this pk!');
        }

        return await this.connectionPool.request()
            .query(`UPDATE PULPIT SET PULPIT_NAME = '${pulpit_name}', FACULTY = '${faculty}' WHERE PULPIT = '${pulpit}'`);
    }

    async putSubjects(data) {
        const subject = data.SUBJECT;
        const subjectName = data.SUBJECT_NAME;
        const pulpit = data.PULPIT;

        return await this.connectionPool.request()
            .query(`UPDATE SUBJECT SET SUBJECT_NAME = '${subjectName}', PULPIT = '${pulpit}' WHERE SUBJECT = '${subject}'`);
    }

    async putAuditoriumsTypes(data) {
        const auditoriumType = data.AUDITORIUM_TYPE;
        const auditoriumTypeName = data.AUDITORIUM_TYPENAME;

        return await this.connectionPool.request()
            .query(`UPDATE AUDITORIUM_TYPE SET AUDITORIUM_TYPENAME = '${auditoriumTypeName}' WHERE AUDITORIUM_TYPE = '${auditoriumType}'`);
    }

    async putAuditoriums(data) {
        const auditorium = data.AUDITORIUM;
        const auditoriumName = data.AUDITORIUM_NAME;
        const auditoriumType = data.AUDITORIUM_TYPE;
        const auditoriumCapacity = +data.AUDITORIUM_CAPACITY;

        return await this.connectionPool.request()
            .query(`UPDATE AUDITORIUM SET AUDITORIUM_NAME = '${auditoriumName}', AUDITORIUM_TYPE = '${auditoriumType}', AUDITORIUM_CAPACITY = ${auditoriumCapacity} WHERE AUDITORIUM = '${auditorium}'`);
    }



    //DELETE
    async deleteFaculties(code) {
        const faculty = code;
        const resp = await this.connectionPool.request().query(`SELECT * FROM FACULTY WHERE FACULTY = '${faculty}'`);

        await this.connectionPool.request()
            .query(`DELETE FROM FACULTY WHERE FACULTY = '${faculty}'`);

        return resp;
    }

    ////////////////////TODO//////////////////////////////////////////////////////////////////////////////////
    async deletePulpits(code) {
        const pulpit = code;

        const resp = await this.connectionPool.request().query(`SELECT * FROM PULPIT WHERE PULPIT = '${pulpit}'`);

        if (resp.recordset.length === 0) {
            return new Error('There are no record with this pk!');
        }
        await this.connectionPool.request()
            .query(`DELETE FROM PULPIT WHERE PULPIT = '${pulpit}'`);

        return resp;
    }

    async deleteSubjects(code) {
        const subject = code;

        const resp = await this.connectionPool.request().query(`SELECT * FROM SUBJECT WHERE SUBJECT = '${subject}'`);

        await this.connectionPool.request()
            .query(`DELETE FROM SUBJECT WHERE SUBJECT = '${subject}'`);

        return resp;
    }

    async deleteAuditoriums(code) {
        const auditorium = code;

        const resp = await this.connectionPool.request().query(`SELECT * FROM AUDITORIUM WHERE AUDITORIUM = '${auditorium}'`);

        await this.connectionPool.request()
            .query(`DELETE FROM AUDITORIUM WHERE AUDITORIUM = '${auditorium}'`);

        return resp;
    }

    async deleteAuditoriumsTypes(code) {
        const auditoriumType = code;

        const resp = await this.connectionPool.request().query(`SELECT * FROM AUDITORIUM_TYPE WHERE AUDITORIUM_TYPE = '${auditoriumType}'`);

        await this.connectionPool.request()
            .query(`DELETE FROM AUDITORIUM_TYPE WHERE AUDITORIUM_TYPE = '${auditoriumType}'`);

        return resp;
    }

}

module.exports = DB;