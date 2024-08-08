import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { removeTestUser, createTestUser, getTestUser } from "./test-util.js";
import bcrypt from "bcrypt";

describe('POST /api/users', () => {

    // Setelah setiap tes, hapus pengguna uji untuk membersihkan basis data
    afterEach(async () => {
        await removeTestUser();
    });

    // Tes untuk mendaftarkan pengguna baru
    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                "username": 'test',
                "password": 'rahasia',
                "name": 'test'
            });
        
        // Log response untuk debugging
        logger.info(result.body);
        
        // Assertion
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.password).toBeUndefined();
        expect(result.body.data.name).toBe("test");
    });

    // Tes untuk menolak jika request tidak valid
    it('should reject if request invalid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                "username": '',
                "password": '',
                "name": ''
            });

        // Log response untuk debugging
        logger.info(result.body);
        
        // Assertion
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    // Tes untuk menolak jika username sudah terdaftar
    it('should reject if username already registered', async () => {
        // Daftarkan pengguna pertama kali
        let result = await supertest(web)
            .post('/api/users')
            .send({
                "username": 'test',
                "password": 'rahasia',
                "name": 'test'
            });

        // Log response untuk debugging
        logger.info(result.body);
        
        // Assertion pertama (harus berhasil)
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();

        // Coba daftarkan kembali dengan username yang sama
        result = await supertest(web)
            .post('/api/users')
            .send({
                "username": 'test',
                "password": 'rahasia',
                "name": 'test'
            });

        // Log response untuk debugging
        logger.info(result.body);

        // Assertion kedua (harus gagal)
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('POST /api/users/login', () => {
    // Sebelum setiap tes login, buat pengguna uji
    beforeEach(async () => {
        await createTestUser();
    });

    // Setelah setiap tes, hapus pengguna uji
    afterEach(async () => {
        await removeTestUser();
    });

    // Tes untuk login
    it('should can login', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                "username": 'test',
                "password": 'rahasia',
            });

        // Log response untuk debugging
        logger.info(result.body);

        // Assertion
        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });

    it('should reject login if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                "username": '',
                "password": '',
            });

        // Log response untuk debugging
        logger.info(result.body);

        // Assertion
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject login if password wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                "username": 'test',
                "password": 'password salah',
            });

        // Log response untuk debugging
        logger.info(result.body);

        // Assertion
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject login if username wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                "username": 'salah',
                "password": 'rahasia',
            });

        // Log response untuk debugging
        logger.info(result.body);

        // Assertion
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

});

describe('GET /api/users/current', () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can get current user', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'test')

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
    });

    it('should reject if token is invalid', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'token salah');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    })

});


describe('PATCH /api/users/current', () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can update user', async  () => {
        const result = await supertest(web)
            .patch("/api/users/current")
            .set("Authorization", "test")
            .send({
                name: "Rapl",
                password: "ubahrahasia",
            });
        
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("Rapl");

        const user = await getTestUser();
        expect(await bcrypt.compare("ubahrahasia", user.password)).toBe(true);
    });

    it('should can update user name', async  () => {
        const result = await supertest(web)
            .patch("/api/users/current")
            .set("Authorization", "test")
            .send({
                name: "Rapl",

            });
        
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("Rapl");

    });

    it('should can update user password', async  () => {
        const result = await supertest(web)
            .patch("/api/users/current")
            .set("Authorization", "test")
            .send({
                password: "ubahrahasia"
            });
        
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");

        const user = await getTestUser();
        expect(await bcrypt.compare("ubahrahasia", user.password)).toBe(true);
    });

    it('should reject if request not valid', async  () => {
        const result = await supertest(web)
            .patch("/api/users/current")
            .set("Authorization", "token salah")
            .send({});
        
        expect(result.status).toBe(401);
    });

});


describe('DELETE /api/users/logout', () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can logout', async () => {
        const result = await supertest(web)
            .delete("/api/users/logout")
            .set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        const user = await getTestUser();
        expect(user.token).toBeNull();
    });

    it('should reject logout if token is invalid', async () => {
        const result = await supertest(web)
            .delete("/api/users/logout")
            .set("Authorization", "token salah");

        expect(result.status).toBe(401);
    })
});