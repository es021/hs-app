// const Month = [
//     "", "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
// ];

const Month = [{
        key: "",
        label: ""
    },
    {
        key: "01",
        label: "January"
    },
    {
        key: "02",
        label: "February"
    },
    {
        key: "03",
        label: "March"
    },
    {
        key: "04",
        label: "April"
    },
    {
        key: "05",
        label: "May"
    },
    {
        key: "06",
        label: "June"
    },
    {
        key: "07",
        label: "July"
    },
    {
        key: "08",
        label: "August"
    },
    {
        key: "09",
        label: "September"
    },
    {
        key: "10",
        label: "October"
    },
    {
        key: "11",
        label: "November"
    },
    {
        key: "12",
        label: "December"
    },
]

function getMonthLabel(key) {
    for (var i in Month) {
        if (Month[i].key == key) {
            return Month[i].label;
        }
    }

    return "";
}

// var sql = "";
// for(var i in Month){
//  sql += `

//  UPDATE wp_cf_usermeta 
//  SET meta_value = '${Month[i].key}'
//  WHERE 1=1
//  AND meta_value = '${Month[i].label}'
//  AND meta_key like '%month';

//  `;
// }

// console.log(sql)

const Year = [
    "",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
];

const DegreeLevel = [
    "",
    "Doctoral",
    "Executive",
    "Master",
    "Bachelor",
    "Foundation",
    "SPM",
];

const Sponsor = [
    "",
    "Jabatan Perkhidmatan Awam (JPA)",
    "Majlis Amanah Rakyat (MARA)",
    "Petronas",
    "Maybank",
    "Tenaga Nasional Berhad (TNB)",
    "Bank Negara",
    "Khazanah National Berhad",
    "Private",
    "Other"
];

const PositionType = [
    "Full-Time",
    "Part-Time",
    "Intership",
    "Co-op"
];

const MasState = [
    "",
    "Johor",
    "Kedah",
    "Kelantan",
    "Melaka",
    "Negeri Sembilan",
    "Pahang",
    "Penang",
    "Perak",
    "Perlis",
    "Sabah",
    "Sarawak",
    "Selangor",
    "Terengganu",
    "Kuala Lumpur",
    "Labuan",
    "Putrajaya"
];

const Country = [
    "",
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "AndorrA",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo, The Democratic Republic of the",
    "Cook Islands",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands (Malvinas)",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and Mcdonald Islands",
    "Holy See (Vatican City State)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran, Islamic Republic Of",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, Republic of",
    "Kuwait",
    "Kyrgyzstan",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libyan Arab Jamahiriya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Macedonia, The Former Yugoslav Republic of",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia, Federated States of",
    "Moldova, Republic of",
    "Monaco",
    "Mongolia",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestinian Territory, Occupied",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russian Federation",
    "RWANDA",
    "Saint Helena",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia and Montenegro",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan, Province of China",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "USA",
    "United States Minor Outlying Islands",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Viet Nam",
    "Virgin Islands, British",
    "Virgin Islands, U.S.",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe"
];

const StudyField = [
    "",
    "Accounting and Computer Science",
    "Accounting and Related Services",
    "Advanced/Graduate Dentistry and Oral Sciences",
    "Aerospace, Aeronautical and Astronautical Engineering",
    "African Languages, Literatures, and Linguistics",
    "Agricultural Business and Management",
    "Agricultural Engineering",
    "Agricultural Mechanization",
    "Agricultural Production Operations",
    "Agricultural Public Services",
    "Agricultural and Domestic Animal Services",
    "Agricultural and Food Products Processing",
    "Agriculture, Agriculture Operations, and Related Sciences",
    "Air Transportation",
    "Allied Health Diagnostic, Intervention, and Treatment Professions",
    "Allied Health and Medical Assisting Services",
    "Alternative and Complementary Medical Support Services",
    "Alternative and Complementary Medicine and Medical Systems",
    "American Indian/Native American Languages, Literatures, and Linguistics",
    "American Sign Language",
    "Animal Sciences",
    "Anthropology",
    "Apparel and Textiles",
    "Applied Horticulture and Horticultural Business Services",
    "Applied Mathematics",
    "Archeology",
    "Architectural Engineering",
    "Architectural Engineering Technologies/Technicians",
    "Architectural History and Criticism",
    "Architectural Sciences and Technology",
    "Architecture",
    "Architecture and Related Services",
    "Area Studies",
    "Area, Ethnic, Cultural, Gender, and Group Studies",
    "Arts, Entertainment,and Media Management",
    "Astronomy and Astrophysics",
    "Atmospheric Sciences and Meteorology",
    "Audiovisual Communications Technologies/Technicians",
    "Aviation",
    "Behavioral Sciences",
    "Bible/Biblical Studies",
    "Bilingual, Multilingual, and Multicultural Education",
    "Biochemical Engineering",
    "Biochemistry, Biophysics and Molecular Biology",
    "Bioethics/Medical Ethics",
    "Biological and Biomedical Sciences",
    "Biological and Physical Sciences",
    "Biological/Biosystems Engineering",
    "Biology",
    "Biomathematics, Bioinformatics, and Computational Biology",
    "Biomedical/Medical Engineering",
    "Biopsychology",
    "Biotechnology",
    "Boilermaking/Boilermaker",
    "Botany/Plant Biology",
    "Building/Construction Finishing, Management, and Inspection",
    "Business Administration, Management and Operations",
    "Business Operations Support and Assistant Services",
    "Business, Management, Marketing, and Related Support Services",
    "Business/Commerce",
    "Business/Corporate Communications",
    "Business/Managerial Economics",
    "Carpenters",
    "Cell/Cellular Biology and Anatomical Sciences",
    "Celtic Languages, Literatures, and Linguistics",
    "Ceramic Sciences and Engineering",
    "Chemical Engineering",
    "Chemistry",
    "Chiropractic",
    "City/Urban, Community and Regional Planning",
    "Civil Engineering",
    "Civil Engineering Technologies/Technicians",
    "Classical and Ancient Studies",
    "Classics and Classical Languages, Literatures, and Linguistics",
    "Clinical/Medical Laboratory Science/Research and Allied Professions",
    "Cognitive Science",
    "Communication Disorders Sciences and Services",
    "Communication and Media Studies",
    "Communication, Journalism, and Related Programs",
    "Communications Technologies/technicians and Support Services",
    "Communications Technology/Technician",
    "Community Organization and Advocacy",
    "Computational Science",
    "Computer Engineering",
    "Computer Engineering Technologies/Technicians",
    "Computer Programming",
    "Computer Science",
    "Computer Software and Media Applications",
    "Computer Systems Analysis",
    "Computer Systems Networking and Telecommunications",
    "Computer and Information Sciences",
    "Computer and Information Sciences and Support Services",
    "Computer/Information Technology Administration and Management",
    "Construction Engineering",
    "Construction Engineering Technologies",
    "Construction Management",
    "Construction Trades",
    "Cooking and Related Culinary Arts",
    "Cosmetology and Related Personal Grooming Services",
    "Crafts/Craft Design, Folk Art and Artisanry",
    "Criminal Justice and Corrections",
    "Criminology",
    "Cultural Studies/Critical Theory and Analysis",
    "Curriculum and Instruction",
    "Dance",
    "Data Entry/Microcomputer Applications",
    "Data Processing",
    "Demography and Population Studies",
    "Dental Support Services and Allied Professions",
    "Dentistry",
    "Design and Applied Arts",
    "Dietetics and Clinical Nutrition Services",
    "Dispute Resolution",
    "Drafting/Design Engineering Technologies/Technicians",
    "Drama/Theatre Arts and Stagecraft",
    "East Asian Languages, Literatures, and Linguistics",
    "Ecology, Evolution, Systematics, and Population Biology",
    "Economics",
    "Education",
    "Educational Administration and Supervision",
    "Educational Assessment, Evaluation, and Research",
    "Educational/Instructional Media Design",
    "Electrical Engineering Technologies/Technicians",
    "Electrical and Power Transmission Installers",
    "Electrical, Electronics and Communications Engineering",
    "Electrical/Electronics Maintenance and Repair Technology",
    "Electromechanical Engineering",
    "Electromechanical Instrumentation and Maintenance Technologies/Technicians",
    "Energy and Biologically Based Therapies",
    "Engineering",
    "Engineering Chemistry",
    "Engineering Mechanics",
    "Engineering Physics",
    "Engineering Science",
    "Engineering Technologies and Engineering-Related Fields",
    "Engineering-Related Fields",
    "Engineering-Related Technologies",
    "English Language and Literature",
    "English Language and Literature/letters",
    "Entrepreneurial and Small Business Operations",
    "Environmental Control Technologies/Technicians",
    "Environmental Design",
    "Environmental/Environmental Health Engineering",
    "Ethnic Studies",
    "Family and Consumer Economics and Related Studies",
    "Family and Consumer Sciences/Human Sciences",
    "Family and Consumer Sciences/Human Sciences Business Services",
    "Family and Consumer Sciences/human Sciences",
    "Film/Video and Photographic Arts",
    "Finance and Financial Management Services",
    "Fine and Studio Arts",
    "Fire Protection",
    "Fishing and Fisheries Sciences and Management",
    "Food Science and Technology",
    "Foods, Nutrition, and Related Services",
    "Foreign Languages, Literatures, and Linguistics",
    "Forest Engineering",
    "Forestry",
    "Funeral Service and Mortuary Science",
    "General Sales, Merchandising and Related Marketing Operations",
    "Genetics",
    "Geography and Cartography",
    "Geological and Earth Sciences/Geosciences",
    "Geological/Geophysical Engineering",
    "Germanic Languages, Literatures, and Linguistics",
    "Gerontology",
    "Graphic Communications",
    "Ground Transportation",
    "Health Aides/Attendants/Orderlies",
    "Health Professions and Related Programs",
    "Health and Medical Administrative Services",
    "Health and Physical Education/Fitness",
    "Health/Medical Preparatory Programs",
    "Heating, Air Conditioning, Ventilation and Refrigeration Maintenance Technology/Technician (HAC, HACR, HVAC, HVACR)",
    "Heavy/Industrial Equipment Maintenance Technologies",
    "Historic Preservation and Conservation",
    "History",
    "Holocaust and Related Studies",
    "Homeland Security",
    "Homeland Security, Law Enforcement, Firefighting",
    "Hospitality Administration/Management",
    "Housing and Human Environments",
    "Human Biology",
    "Human Computer Interaction",
    "Human Development, Family Studies, and Related Services",
    "Human Resources Management and Services",
    "Human Services",
    "Industrial Engineering",
    "Industrial Production Technologies/Technicians",
    "Information Science/Studies",
    "Insurance",
    "Intelligence, Command Control and Information Operations",
    "Intercultural/Multicultural and Diversity Studies",
    "Interior Architecture",
    "International Agriculture",
    "International Business",
    "International Relations and National Security Studies",
    "International and Comparative Education",
    "International/Global Studies",
    "Iranian/Persian Languages, Literatures, and Linguistics",
    "Journalism",
    "Landscape Architecture",
    "Law",
    "Leatherworking and Upholstery",
    "Legal Professions and Studies",
    "Legal Research and Advanced Professional Studies",
    "Legal Support Services",
    "Liberal Arts and Sciences Studies and Humanities",
    "Library Science",
    "Library Science and Administration",
    "Library and Archives Assisting",
    "Linguistic, Comparative, and Related Language Studies and Services",
    "Literature",
    "Management Information Systems and Services",
    "Management Sciences and Quantitative Methods",
    "Manufacturing Engineering",
    "Marine Sciences",
    "Marine Transportation",
    "Maritime Studies",
    "Marketing",
    "Mason/Masonry",
    "Materials Engineering",
    "Materials Sciences",
    "Mathematics",
    "Mathematics and Computer Science",
    "Mathematics and Statistics",
    "Mechanic and Repair Technologies/technicians",
    "Mechanical Engineering",
    "Mechanical Engineering Related Technologies/Technicians",
    "Mechatronics, Robotics, and Automation Engineering",
    "Medical Clinical Sciences/Graduate Medical Studies",
    "Medical Illustration and Informatics",
    "Medicine",
    "Medieval and Renaissance Studies",
    "Mental and Social Health Services and Allied Professions",
    "Metallurgical Engineering",
    "Microbiological Sciences and Immunology",
    "Middle/Near Eastern and Semitic Languages, Literatures, and Linguistics",
    "Military Applied Sciences",
    "Military Systems and Maintenance Technology",
    "Military Technologies and Applied Sciences",
    "Mining and Mineral Engineering",
    "Mining and Petroleum Technologies/Technicians",
    "Missions/Missionary Studies and Missiology",
    "Modern Greek Language and Literature",
    "Molecular Medicine",
    "Movement and Mind-Body Therapies and Education",
    "Multi/interdisciplinary Studies",
    "Museology/Museum Studies",
    "Music",
    "Nanotechnology",
    "Natural Resources Conservation and Research",
    "Natural Resources Management and Policy",
    "Natural Resources and Conservation",
    "Natural Sciences",
    "Naval Architecture and Marine Engineering",
    "Neurobiology and Neurosciences",
    "Nuclear Engineering",
    "Nuclear Engineering Technologies/Technicians",
    "Nutrition Sciences",
    "Ocean Engineering",
    "Operations Research",
    "Ophthalmic and Optometric Support Services and Allied Professions",
    "Optometry",
    "Osteopathic Medicine/Osteopathy",
    "Other",
    "Outdoor Education",
    "Paper Science and Engineering",
    "Parks, Recreation and Leisure Facilities Management",
    "Parks, Recreation and Leisure Studies",
    "Parks, Recreation, Leisure, and Fitness Studies",
    "Pastoral Counseling and Specialized Ministries",
    "Peace Studies and Conflict Resolution",
    "Personal and Culinary Services",
    "Petroleum Engineering",
    "Pharmacology and Toxicology",
    "Pharmacy, Pharmaceutical Sciences, and Administration",
    "Philosophy",
    "Philosophy and Religious Studies",
    "Physical Sciences",
    "Physics",
    "Physiology, Pathology and Related Sciences",
    "Plant Sciences",
    "Plumbing and Related Water Supply Services",
    "Podiatric Medicine/Podiatry",
    "Political Science and Government",
    "Polymer/Plastics Engineering",
    "Practical Nursing, Vocational Nursing and Nursing Assistants",
    "Precision Metal Working",
    "Precision Production",
    "Precision Systems Maintenance and Repair Technologies",
    "Psychology",
    "Public Administration",
    "Public Health",
    "Public Policy Analysis",
    "Public Relations, Advertising, and Applied Communication",
    "Publishing",
    "Quality Control and Safety Technologies/Technicians",
    "Radio, Television, and Digital Communication",
    "Real Estate",
    "Real Estate Development",
    "Registered Nursing, Nursing Administration, Nursing Research and Clinical Nursing",
    "Rehabilitation and Therapeutic Professions",
    "Religion/Religious Studies",
    "Religious Education",
    "Religious/Sacred Music",
    "Research and Experimental Psychology",
    "Rhetoric and Composition/Writing Studies",
    "Romance Languages, Literatures, and Linguistics",
    "Rural Sociology",
    "Science, Technology and Society",
    "Slavic Languages, Literatures, and Linguistics",
    "Social Sciences",
    "Social Work",
    "Social and Philosophical Foundations of Education",
    "Sociology",
    "Sociology and Anthropology",
    "Soil Sciences",
    "Somatic Bodywork and Related Therapeutic Services",
    "South Asian Languages, Literatures, and Linguistics",
    "Southeast Asian and Australasian/Pacific Languages, Literatures, and Linguistics",
    "Special Education and Teaching",
    "Specialized Sales, Merchandising and Marketing Operations",
    "Statistics",
    "Student Counseling and Personnel Services",
    "Surveying Engineering",
    "Sustainability Studies",
    "Systems Engineering",
    "Systems Science and Theory",
    "Taxation",
    "Teacher Education and Professional Development, Specific Levels and Methods",
    "Teacher Education and Professional Development, Specific Subject Areas",
    "Teaching Assistants/Aides",
    "Teaching English or French as a Second or Foreign Language",
    "Telecommunications Management",
    "Textile Sciences and Engineering",
    "Theological and Ministerial Studies",
    "Theology and Religious Vocations",
    "Transportation and Materials Moving",
    "Turkic, Uralic-Altaic, Caucasian, and Central Asian Languages, Literatures, and Linguistics",
    "Urban Studies/Affairs",
    "Vehicle Maintenance and Repair Technologies",
    "Veterinary Biomedical and Clinical Sciences",
    "Veterinary Medicine",
    "Visual and Performing Arts",
    "Wildlife and Wildlands Science and Management",
    "Woodworking",
    "Zoology/Animal Biology",
    "Other"
]

// const Country = [
//     "",
//     "New Zealand",
//     "USA",
//     "Japan",
//     "Austria",
//     "Belgium",
//     "Bulgaria",
//     "Canada",
//     "China",
//     "Croatia",
//     "Cyprus",
//     "Czech Republic",
//     "Denmark",
//     "Estonia",
//     "Finland",
//     "France",
//     "Germany",
//     "Greece",
//     "Hong Kong",
//     "Hungary",
//     "Ireland",
//     "Italy",
//     "Latvia",
//     "Lithuania",
//     "Luxembourg",
//     "Malta",
//     "Netherlands",
//     "Poland",
//     "Portugal",
//     "Romania",
//     "Russia",
//     "Slovakia",
//     "Slovenia",
//     "Spain",
//     "Sweden",
//     "Taiwan",
//     "Turkey",
//     "United Kingdom"
// ];

module.exports = {
    DegreeLevel,
    getMonthLabel,
    Month,
    StudyField,
    Year,
    Sponsor,
    PositionType,
    MasState,
    Country
};