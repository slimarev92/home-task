import { IDashboardResponse } from 'src/entities/dasboard-response';

export const MOCK_DATA: IDashboardResponse = [
    {
        text: 'Employee name: John Smith, Social security number: 111-22-3333, Company: Apple Beverages, Inc.',
        marks: [
            {
                start: 15,
                end: 25,
                categories: ['personal_name'],
            },
            {
                start: 51,
                end: 62,
                categories: ['social_security_number', 'us_personal_information'],
            },
            {
                start: 73,
                end: 94,
                categories: ['company_name', 'predefined_pattern'],
            },
        ],
    },
    {
        text: 'Employee name: John Smith, Social security number: 111-22-3333, Company: Apple Beverages, Inc.',
        marks: [],
    },
    {
        text: 'Employee name: John Smith, Social security number: 555-555-555, Company: 😂😂😂😂😂 Beverages, Inc.',
        marks: [
            {
                start: 51,
                end: 62,
                categories: ['social_security_number', 'us_personal_information', 'third_category'],
            },
            {
                start: 73,
                end: 99,
                categories: ['company_name', 'predefined_pattern', 'third_category', 'fourth_category'],
            },
            {
                start: 120,
                end: 200,
                categories: ['cat1', 'cat2'],
            },
        ],
    },
    {
        text: 'The Number 23 is a 2007 American thriller film written by Fernley Phillips and directed by Joel Schumacher, his 23rd film. Jim Carrey stars as a man who becomes obsessed with the 23 enigma once he reads about it in a strange book that seemingly mirrors his own life. The film was released in the United States on February 23, 2007. This is the second film to pair Schumacher and Carrey, the first being Batman Forever. The film was a financial success, grossing $77.6 million, but received generally negative reviews from critics. Despite this, Carrey was proud of the film, saying: I was able to explore the darker edges of my personality, which really was a blast and something different for me.',
        marks: [
            {
                start: 0,
                end: 3,
                categories: ['start_mark'],
            },
            {
                start: 4,
                end: 13,
                categories: ['movie_name', 'film_name', 'number_23', 'title', 'movie_title'],
            },
            {
                start: 58,
                end: 74,
                categories: ['personal_name'],
            },
            {
                start: 91,
                end: 106,
                categories: ['personal_name'],
            },
            {
                start: 694,
                end: 697,
                categories: ['end_mark'],
            },
        ],
    },
];
