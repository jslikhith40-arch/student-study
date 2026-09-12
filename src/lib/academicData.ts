import { 
  db, 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  query, 
  where 
} from './firebase';
import { 
  Course, 
  Branch, 
  Subject, 
  Topic, 
  AttendanceRecord, 
  TimetableEntry, 
  Assignment, 
  ExamEntry, 
  ResultEntry, 
  Quiz,
  CodingProblem,
  AppNotification
} from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'btech',
    name: 'B.Tech',
    code: 'BTECH',
    description: 'Bachelor of Technology in Engineering & Computer Sciences',
    iconName: 'Cpu',
    level: 'Undergraduate'
  },
  {
    id: 'bcom',
    name: 'B.Com',
    code: 'BCOM',
    description: 'Bachelor of Commerce with Honors in Accounting & Finance',
    iconName: 'BadgePercent',
    level: 'Undergraduate'
  },
  {
    id: 'bsc',
    name: 'B.Sc',
    code: 'BSC',
    description: 'Bachelor of Science in Mathematics, Physics & Computing',
    iconName: 'FlaskConical',
    level: 'Undergraduate'
  },
  {
    id: 'bba',
    name: 'BBA',
    code: 'BBA',
    description: 'Bachelor of Business Administration & Management',
    iconName: 'Briefcase',
    level: 'Undergraduate'
  },
  {
    id: 'mba',
    name: 'MBA',
    code: 'MBA',
    description: 'Master of Business Administration & Leadership',
    iconName: 'LineChart',
    level: 'Postgraduate'
  },
  {
    id: 'mca',
    name: 'MCA',
    code: 'MCA',
    description: 'Master of Computer Applications & Software Architecture',
    iconName: 'Terminal',
    level: 'Postgraduate'
  },
  {
    id: 'diploma',
    name: 'Diploma / Polytechnic',
    code: 'DIPLOMA',
    description: 'Engineering Diploma Technical Core Curricula',
    iconName: 'Wrench',
    level: 'Diploma'
  }
];

export const INITIAL_BRANCHES: Branch[] = [
  { id: 'btech_cse', courseId: 'btech', name: 'Computer Science & Engineering (CSE)', code: 'CSE', yearsCount: 4 },
  { id: 'btech_aiml', courseId: 'btech', name: 'Artificial Intelligence & Machine Learning (AI & ML)', code: 'AI&ML', yearsCount: 4 },
  { id: 'btech_it', courseId: 'btech', name: 'Information Technology (IT)', code: 'IT', yearsCount: 4 },
  { id: 'btech_ece', courseId: 'btech', name: 'Electronics & Communication Engineering (ECE)', code: 'ECE', yearsCount: 4 },
  { id: 'btech_eee', courseId: 'btech', name: 'Electrical & Electronics Engineering (EEE)', code: 'EEE', yearsCount: 4 },
  { id: 'btech_mech', courseId: 'btech', name: 'Mechanical Engineering', code: 'MECH', yearsCount: 4 },
  { id: 'btech_civil', courseId: 'btech', name: 'Civil Engineering', code: 'CIVIL', yearsCount: 4 },
];

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'sub_dbms',
    courseId: 'btech',
    branchId: 'btech_cse',
    year: '3rd Year',
    semester: 'Semester 1',
    name: 'Database Management Systems (DBMS)',
    code: 'CS501PC',
    facultyName: 'Dr. Ramesh Sharma',
    facultyEmail: 'ramesh.sharma@college.edu',
    totalTopics: 5,
    completedTopics: 3,
    progressPercent: 60,
    credits: 4
  },
  {
    id: 'sub_os',
    courseId: 'btech',
    branchId: 'btech_cse',
    year: '3rd Year',
    semester: 'Semester 1',
    name: 'Operating Systems & Concurrency',
    code: 'CS502PC',
    facultyName: 'Prof. Ananya Roy',
    facultyEmail: 'ananya.roy@college.edu',
    totalTopics: 6,
    completedTopics: 4,
    progressPercent: 66,
    credits: 4
  },
  {
    id: 'sub_cn',
    courseId: 'btech',
    branchId: 'btech_cse',
    year: '3rd Year',
    semester: 'Semester 1',
    name: 'Computer Networks & Protocols',
    code: 'CS503PC',
    facultyName: 'Dr. V. K. Murthy',
    facultyEmail: 'vk.murthy@college.edu',
    totalTopics: 5,
    completedTopics: 2,
    progressPercent: 40,
    credits: 3
  },
  {
    id: 'sub_se',
    courseId: 'btech',
    branchId: 'btech_cse',
    year: '3rd Year',
    semester: 'Semester 1',
    name: 'Software Engineering & Agile Methodologies',
    code: 'CS504PC',
    facultyName: 'Prof. Meera Patel',
    facultyEmail: 'meera.patel@college.edu',
    totalTopics: 4,
    completedTopics: 4,
    progressPercent: 100,
    credits: 3
  },
  {
    id: 'sub_ai',
    courseId: 'btech',
    branchId: 'btech_cse',
    year: '3rd Year',
    semester: 'Semester 1',
    name: 'Artificial Intelligence & Heuristics',
    code: 'CS505PE',
    facultyName: 'Dr. Arvind Swamy',
    facultyEmail: 'arvind.swamy@college.edu',
    totalTopics: 5,
    completedTopics: 3,
    progressPercent: 60,
    credits: 3
  }
];

export const INITIAL_TOPICS: Topic[] = [
  {
    id: 'top_norm',
    subjectId: 'sub_dbms',
    title: 'Normalization (1NF, 2NF, 3NF, BCNF)',
    description: 'Systematic database decomposition to eliminate insertion, deletion, and update anomalies while preserving lossless joins.',
    order: 1,
    pdfTitle: 'DBMS Unit 3 - Normalization & Dependencies.pdf',
    pdfPageCount: 28,
    keyPoints: [
      'Functional dependencies form the basis of all relational normalization algorithms.',
      '1NF mandates atomicity of attribute values.',
      '2NF requires full functional dependency on candidate keys (no partial dependencies).',
      '3NF eliminates transitive dependencies (every non-key attribute must directly depend on candidate keys).'
    ],
    durationMinutes: 45,
    completed: true
  },
  {
    id: 'top_transactions',
    subjectId: 'sub_dbms',
    title: 'Transaction Management & ACID Properties',
    description: 'Atomicity, Consistency, Isolation, and Durability guarantees across distributed database systems.',
    order: 2,
    pdfTitle: 'DBMS Unit 4 - ACID & Concurrency Control.pdf',
    pdfPageCount: 34,
    keyPoints: [
      'Two-Phase Locking (2PL) guarantees serializability but can cause deadlocks.',
      'Write-Ahead Logging (WAL) ensures durability in case of system power loss.'
    ],
    durationMinutes: 50,
    completed: true
  },
  {
    id: 'top_indexing',
    subjectId: 'sub_dbms',
    title: 'B+ Tree Indexing & Query Execution Plans',
    description: 'Balanced search tree structures for sequential disk access and log(N) record retrieval.',
    order: 3,
    pdfTitle: 'DBMS Unit 2 - File Organization & Indexing.pdf',
    pdfPageCount: 22,
    keyPoints: [
      'Leaves are linked as a doubly linked list for fast range scan queries.',
      'Internal nodes only store keys, yielding high fanout and low tree height.'
    ],
    durationMinutes: 40,
    completed: false
  },
  {
    id: 'top_er_diagrams',
    subjectId: 'sub_dbms',
    title: 'Relational Modeling & ER Diagrams',
    description: 'Entity-relationship modeling, cardinalities, weak entity sets, and conversion into relational schemas.',
    order: 4,
    pdfTitle: 'DBMS Unit 1 - Introduction to ER Models.pdf',
    pdfPageCount: 19,
    keyPoints: ['Entities, Attributes, and Relationship sets', 'Mapping 1:1, 1:N, and M:N relationships to foreign keys'],
    durationMinutes: 35,
    completed: true
  },
  {
    id: 'top_sql_queries',
    subjectId: 'sub_dbms',
    title: 'Advanced SQL, Subqueries & Window Functions',
    description: 'Complex aggregation, joins, CTEs, and window partition functions for analytical data processing.',
    order: 5,
    pdfTitle: 'DBMS Unit 2 - Advanced SQL Masterclass.pdf',
    pdfPageCount: 40,
    keyPoints: ['Common Table Expressions (WITH clauses)', 'Window functions (RANK, DENSE_RANK, OVER PARTITION BY)'],
    durationMinutes: 60,
    completed: false
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz_dbms_norm',
    subjectId: 'sub_dbms',
    subjectName: 'Database Management Systems',
    topicTitle: 'Normalization (1NF to BCNF)',
    title: 'DBMS Normalization Mastery Challenge',
    durationMinutes: 10,
    questions: [
      {
        id: 'q1',
        question: 'Which normal form is based on the concept of "full functional dependency"?',
        options: ['1NF', '2NF', '3NF', '4NF'],
        correctAnswerIndex: 1,
        explanation: 'Second Normal Form (2NF) requires the relation to be in 1NF and all non-prime attributes to be fully functionally dependent on any candidate key.'
      },
      {
        id: 'q2',
        question: 'A relation R is in 3NF if for every functional dependency X -> Y, which condition must hold?',
        options: [
          'Y is a composite key',
          'X is a super key or Y is a prime attribute',
          'X is a prime attribute and Y is not prime',
          'Y is a candidate key'
        ],
        correctAnswerIndex: 1,
        explanation: 'In 3NF, either the left-hand side X is a superkey, or the right-hand side Y consists strictly of prime attributes (attributes belonging to some candidate key).'
      },
      {
        id: 'q3',
        question: 'What is the primary drawback of decomposing tables into higher normal forms (like BCNF)?',
        options: [
          'Increased data redundancy',
          'Potential performance overhead due to table joins during queries',
          'Loss of primary keys',
          'Impossibility of using foreign keys'
        ],
        correctAnswerIndex: 1,
        explanation: 'Higher normal forms eliminate anomalies by splitting tables, but this requires more JOIN operations during complex reads.'
      },
      {
        id: 'q4',
        question: 'If a relation has only atomic values in all its attributes, it is guaranteed to satisfy at least:',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctAnswerIndex: 0,
        explanation: 'First Normal Form (1NF) simply disallows multi-valued attributes and composite attributes (atomicity requirement).'
      },
      {
        id: 'q5',
        question: 'A table with dependency A -> B and B -> C violates which normal form if A is the primary key?',
        options: ['1NF', '2NF', '3NF', 'None'],
        correctAnswerIndex: 2,
        explanation: 'A -> B and B -> C is a classic transitive dependency (A -> C via B), which violates 3NF.'
      }
    ]
  }
];

export const INITIAL_TIMETABLE: TimetableEntry[] = [
  { id: 'tt_1', day: 'Monday', subjectName: 'Database Management Systems', subjectCode: 'CS501PC', facultyName: 'Dr. Ramesh Sharma', room: 'LH-302', startTime: '09:00 AM', endTime: '10:00 AM' },
  { id: 'tt_2', day: 'Monday', subjectName: 'Operating Systems', subjectCode: 'CS502PC', facultyName: 'Prof. Ananya Roy', room: 'LH-302', startTime: '10:00 AM', endTime: '11:00 AM' },
  { id: 'tt_3', day: 'Monday', subjectName: 'Computer Networks', subjectCode: 'CS503PC', facultyName: 'Dr. V. K. Murthy', room: 'LH-304', startTime: '11:15 AM', endTime: '12:15 PM' },
  { id: 'tt_4', day: 'Monday', subjectName: 'DBMS Lab (Batch A & B)', subjectCode: 'CS506PC', facultyName: 'Dr. Ramesh Sharma', room: 'Computing Lab 4', startTime: '01:15 PM', endTime: '03:15 PM', isLab: true },
  
  { id: 'tt_5', day: 'Tuesday', subjectName: 'Software Engineering', subjectCode: 'CS504PC', facultyName: 'Prof. Meera Patel', room: 'LH-302', startTime: '09:00 AM', endTime: '10:00 AM' },
  { id: 'tt_6', day: 'Tuesday', subjectName: 'Artificial Intelligence', subjectCode: 'CS505PE', facultyName: 'Dr. Arvind Swamy', room: 'LH-302', startTime: '10:00 AM', endTime: '11:00 AM' },
  { id: 'tt_7', day: 'Tuesday', subjectName: 'Database Management Systems', subjectCode: 'CS501PC', facultyName: 'Dr. Ramesh Sharma', room: 'LH-302', startTime: '11:15 AM', endTime: '12:15 PM' },

  { id: 'tt_8', day: 'Wednesday', subjectName: 'Operating Systems', subjectCode: 'CS502PC', facultyName: 'Prof. Ananya Roy', room: 'LH-302', startTime: '09:00 AM', endTime: '10:00 AM' },
  { id: 'tt_9', day: 'Wednesday', subjectName: 'Computer Networks', subjectCode: 'CS503PC', facultyName: 'Dr. V. K. Murthy', room: 'LH-304', startTime: '10:00 AM', endTime: '11:00 AM' },
  { id: 'tt_10', day: 'Wednesday', subjectName: 'Operating Systems Lab', subjectCode: 'CS507PC', facultyName: 'Prof. Ananya Roy', room: 'Unix Systems Lab', startTime: '01:15 PM', endTime: '03:15 PM', isLab: true },

  { id: 'tt_11', day: 'Thursday', subjectName: 'Artificial Intelligence', subjectCode: 'CS505PE', facultyName: 'Dr. Arvind Swamy', room: 'LH-302', startTime: '09:00 AM', endTime: '10:00 AM' },
  { id: 'tt_12', day: 'Thursday', subjectName: 'Software Engineering', subjectCode: 'CS504PC', facultyName: 'Prof. Meera Patel', room: 'LH-302', startTime: '10:00 AM', endTime: '11:00 AM' },

  { id: 'tt_13', day: 'Friday', subjectName: 'Database Management Systems', subjectCode: 'CS501PC', facultyName: 'Dr. Ramesh Sharma', room: 'LH-302', startTime: '09:00 AM', endTime: '10:00 AM' },
  { id: 'tt_14', day: 'Friday', subjectName: 'Computer Networks', subjectCode: 'CS503PC', facultyName: 'Dr. V. K. Murthy', room: 'LH-304', startTime: '10:00 AM', endTime: '11:00 AM' },
  { id: 'tt_15', day: 'Friday', subjectName: 'Aptitude & Placement Training', subjectCode: 'CP101', facultyName: 'Placement Cell', room: 'Auditorium 2', startTime: '02:00 PM', endTime: '04:00 PM' },

  { id: 'tt_16', day: 'Saturday', subjectName: 'Technical Seminar & Project Review', subjectCode: 'CS508PR', facultyName: 'Faculty Panel', room: 'Seminar Hall 1', startTime: '09:30 AM', endTime: '12:30 PM' },
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg_1',
    subjectId: 'sub_dbms',
    subjectName: 'DBMS',
    title: 'Assignment 3: 3NF & BCNF Decomposition Problems',
    description: 'Solve the 5 given relational schema schemas. Check for dependency preservation and lossless joins with proof steps.',
    dueDate: '2026-09-20',
    maxMarks: 25,
    status: 'pending'
  },
  {
    id: 'asg_2',
    subjectId: 'sub_os',
    subjectName: 'Operating Systems',
    title: 'Banker\'s Algorithm Implementation in C / Python',
    description: 'Implement safety check algorithm and resource-request algorithm with sample matrix input parser.',
    dueDate: '2026-09-15',
    maxMarks: 30,
    status: 'submitted',
    submittedAt: '2026-09-10'
  },
  {
    id: 'asg_3',
    subjectId: 'sub_cn',
    subjectName: 'Computer Networks',
    title: 'Packet Tracer Lab: Subnetting & OSPF Routing',
    description: 'Submit packet tracer (.pkt) workspace file configuring OSPF single-area routing across 3 router hops.',
    dueDate: '2026-09-28',
    maxMarks: 20,
    status: 'pending'
  }
];

export const INITIAL_EXAMS: ExamEntry[] = [
  {
    id: 'ex_1',
    subjectName: 'Database Management Systems',
    subjectCode: 'CS501PC',
    examType: 'Mid-Term',
    date: '2026-10-05',
    time: '10:00 AM - 12:00 PM',
    room: 'Hall B - Desk 42',
    duration: '2 Hours',
    syllabusCovered: 'Unit 1 (ER Models), Unit 2 (Relational Algebra & SQL), Unit 3 (Normalization)'
  },
  {
    id: 'ex_2',
    subjectName: 'Operating Systems',
    subjectCode: 'CS502PC',
    examType: 'Mid-Term',
    date: '2026-10-07',
    time: '10:00 AM - 12:00 PM',
    room: 'Hall B - Desk 42',
    duration: '2 Hours',
    syllabusCovered: 'Process Scheduling, Synchronization, Semaphores, Deadlocks'
  },
  {
    id: 'ex_3',
    subjectName: 'Computer Networks',
    subjectCode: 'CS503PC',
    examType: 'Mid-Term',
    date: '2026-10-09',
    time: '10:00 AM - 12:00 PM',
    room: 'Hall C - Desk 18',
    duration: '2 Hours',
    syllabusCovered: 'OSI Physical, Data Link layer, Flow control, Error detection, Sliding window'
  }
];

export const INITIAL_RESULTS: ResultEntry[] = [
  { id: 'res_1', subjectName: 'Design & Analysis of Algorithms', subjectCode: 'CS401PC', internalMarks: 28, maxInternal: 30, externalMarks: 64, maxExternal: 70, totalMarks: 92, grade: 'A+', gradePoint: 10, credits: 4 },
  { id: 'res_2', subjectName: 'Discrete Mathematics', subjectCode: 'CS402PC', internalMarks: 25, maxInternal: 30, externalMarks: 58, maxExternal: 70, totalMarks: 83, grade: 'A', gradePoint: 9, credits: 4 },
  { id: 'res_3', subjectName: 'Computer Organization & Architecture', subjectCode: 'CS403PC', internalMarks: 27, maxInternal: 30, externalMarks: 60, maxExternal: 70, totalMarks: 87, grade: 'A', gradePoint: 9, credits: 3 },
  { id: 'res_4', subjectName: 'Python Programming Lab', subjectCode: 'CS404PC', internalMarks: 29, maxInternal: 30, externalMarks: 68, maxExternal: 70, totalMarks: 97, grade: 'O', gradePoint: 10, credits: 2 },
  { id: 'res_5', subjectName: 'Environmental Science', subjectCode: 'MC401ES', internalMarks: 26, maxInternal: 30, externalMarks: 61, maxExternal: 70, totalMarks: 87, grade: 'A', gradePoint: 9, credits: 0 }
];

export const INITIAL_CODING_PROBLEMS: CodingProblem[] = [
  {
    id: 'prob_twosum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume each input would have exactly one solution.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
    ],
    starterCode: {
      c: `#include <stdio.h>\n\nvoid twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Write code here\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your C++ solution\n    }\n};`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your Java solution\n    }\n}`,
      python: `def two_sum(nums: list[int], target: int) -> list[int]:\n    # Your Python solution\n    pass`,
      javascript: `function twoSum(nums, target) {\n  // Your JS solution\n}`
    },
    solution: {
      language: 'Python',
      code: `def two_sum(nums, target):\n    lookup = {}\n    for i, n in enumerate(nums):\n        diff = target - n\n        if diff in lookup:\n            return [lookup[diff], i]\n        lookup[n] = i\n    return []`,
      explanation: 'Using a hash map gives O(N) time complexity and O(N) auxiliary space, checking complement existence on single pass.'
    }
  },
  {
    id: 'prob_valid_parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Strings',
    description: 'Given a string s containing just the characters (, ), {, }, [ and ], determine if the input string is valid (brackets must close in the correct order).',
    examples: [
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    starterCode: {
      c: `bool isValid(char* s) {\n    // C solution\n}`,
      cpp: `class Solution {\npublic:\n    bool isValid(string s) {\n        // C++ solution\n    }\n};`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        // Java solution\n    }\n}`,
      python: `def is_valid(s: str) -> bool:\n    # Python solution\n    pass`,
      javascript: `function isValid(s) {\n  // JS solution\n}`
    },
    solution: {
      language: 'JavaScript',
      code: `function isValid(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  for (let c of s) {\n    if (c in map) {\n      if (stack.pop() !== map[c]) return false;\n    } else {\n      stack.push(c);\n    }\n  }\n  return stack.length === 0;\n}`,
      explanation: 'A Last-In First-Out Stack checks that every closing delimiter matches the most recently opened symbol.'
    }
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    studentId: 'all',
    title: 'Attendance Warning Check',
    message: 'Your overall attendance is currently at 86.4%. Keep it safely above 75% for mid-term hall tickets.',
    type: 'attendance',
    read: false,
    createdAt: '2 Hours ago'
  },
  {
    id: 'notif_2',
    studentId: 'all',
    title: 'New Assignment Published: OS Concurrency',
    message: 'Prof. Ananya Roy posted Banker\'s Algorithm implementation assignment due in 5 days.',
    type: 'assignment',
    read: false,
    createdAt: 'Yesterday'
  },
  {
    id: 'notif_3',
    studentId: 'all',
    title: 'Mid-Term Exam Schedule Announced',
    message: 'The B.Tech 3rd Year Mid-Term exam time table is live. Check the Exams tab for room assignments.',
    type: 'exam',
    read: true,
    createdAt: '3 Days ago'
  }
];

/**
 * Ensures initial database collections are populated so the application is completely
 * database-driven from day 1 without empty dead-ends.
 */
export async function seedInitialAcademicDataIfEmpty(): Promise<void> {
  try {
    const coursesSnap = await getDocs(collection(db, 'courses'));
    if (coursesSnap.empty) {
      console.log('Seeding initial curriculum structure to Firestore...');
      for (const course of INITIAL_COURSES) {
        await setDoc(doc(db, 'courses', course.id), course);
      }
      for (const branch of INITIAL_BRANCHES) {
        await setDoc(doc(db, 'branches', branch.id), branch);
      }
      for (const subject of INITIAL_SUBJECTS) {
        await setDoc(doc(db, 'subjects', subject.id), subject);
      }
      for (const topic of INITIAL_TOPICS) {
        await setDoc(doc(db, 'topics', topic.id), topic);
      }
      for (const quiz of INITIAL_QUIZZES) {
        await setDoc(doc(db, 'quizzes', quiz.id), quiz);
      }
      for (const tt of INITIAL_TIMETABLE) {
        await setDoc(doc(db, 'timetable', tt.id), tt);
      }
      for (const asg of INITIAL_ASSIGNMENTS) {
        await setDoc(doc(db, 'assignments', asg.id), asg);
      }
      for (const ex of INITIAL_EXAMS) {
        await setDoc(doc(db, 'exams', ex.id), ex);
      }
      for (const res of INITIAL_RESULTS) {
        await setDoc(doc(db, 'results', res.id), res);
      }
    }
  } catch (err) {
    console.warn('Note on Firestore seeding: will fallback to client-side reactive store if network or permission restricted', err);
  }
}
