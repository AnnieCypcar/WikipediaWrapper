import supertest from 'supertest';
import { Server } from '../../../bin/server.mjs';
import app from '../../../index.js';


describe('articles', () => {
    const start = '1443675600000';

    beforeEach(async () => {
        await Server.start();
    });
    afterEach(async () => {
        await Server.stop();
    });
    describe('/articles/top/weekly/:start', () => {
        it('GET page views for top weekly articles', async () => {
            await supertest(app)
                .get(`/articles/top/weekly/${start}`)
                .expect(200)
                .then((response) => {
                    const results = response.body;
                    expect(results.length).toEqual(2428)
                    expect(results[0]).toEqual({
                        'article': 'Main_Page',
                        'views': 129862199,
                        'rank': 1
                    });
                    expect(results[results.length - 1]).toEqual({
                        'article': 'Ang_Probinsyano',
                        'views': 8247,
                        'rank': 2428
                    });
                });
        });
    });
    describe('/articles/top/monthly/:start', () => {
        it('GET page views for top monthly articles', async () => {
            await supertest(app)
                .get(`/articles/top/monthly/${start}`)
                .expect(200)
                .then((response) => {
                    const results = response.body;
                    expect(results.length).toEqual(1000)
                    expect(results[0]).toEqual({ 
                        article: 'Main_Page', 
                        views: 592738339, 
                        rank: 1 
                    });
                    expect(results[results.length - 1]).toEqual({ 
                        article: 'The_Maze_Runner_(film)', 
                        views: 268716, 
                        rank: 1000 
                    });
                });
        });
    });
    describe('/articles/:name/monthly/:start', () => {
        it('GET article view count for the month', async () => {
            const names = ['Special:Book', 'The_Walking_Dead_(season_5)'];
            const results = [
                {'article':'Special:Book','views':6899468,'startDate':'20151001','endDate':'20151031'},
                {'article':'The_Walking_Dead_(season_5)','views':685926,'startDate':'20151001','endDate':'20151031'}
            ];
            let i = 0;
            for await (const name of names) {
                await supertest(app)
                .get(`/articles/${name}/monthly/${start}`)
                .expect(200)
                .then((response) => {
                    expect(response.body).toEqual(results[i]);
                });
                i += 1;
            }
            
        });
    });
    describe('/articles/:name/weekly/:start', () => {
        it('GET article view count for the week', async () => {
            const names = ['Special:Book', 'The_Walking_Dead_(season_5)'];
            const results = [
                {'article':'Special:Book','views':1552166,'startDate':'20151001','endDate':'20151007'},
                {'article':'The_Walking_Dead_(season_5)','views':139564,'startDate':'20151001','endDate':'20151007'}
            ];
            let i = 0;
            for await (const name of names) {
                await supertest(app)
                .get(`/articles/${name}/weekly/${start}`)
                .expect(200)
                .then((response) => {
                    expect(response.body).toEqual(results[i]);
                });
                i += 1;
            }
        });
    });
    describe('/articles/:name/top/monthly/:start', () => {
        it('GET article top view count day for a month', async () => {
            const names = ['Special:Book', 'The_Walking_Dead_(season_5)'];
            const results = [
                {'article':'Special:Book','maxViews':486932,'maxDate':'2015102000','startDate':'20151001','endDate':'20151031'},
                {'article':'The_Walking_Dead_(season_5)','maxViews':83904,'maxDate':'2015101200','startDate':'20151001','endDate':'20151031'}
            ];
            let i = 0;
            for await (const name of names) {
                await supertest(app)
                .get(`/articles/${name}/top/monthly/${start}`)
                .expect(200)
                .then((response) => {
                    expect(response.body).toEqual(results[i]);
                });
                i += 1;
            }
        });
    });
});
