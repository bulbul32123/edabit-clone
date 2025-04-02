import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createProblem, reset } from '../features/problems/problemsSlice'
import Spinner from '../components/Spinner'
import { FaPlus } from 'react-icons/fa'

function Admin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.problems
    )

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        difficulty: 'Easy',
        category: 'JavaScript',
        starterCode: 'function solution() {\n  // Write your code here\n}',
        testCases: [{ input: '', output: '' }],
        solution: '',
        points: 10,
    })

    const {
        title,
        description,
        difficulty,
        category,
        starterCode,
        testCases,
        solution,
        points,
    } = formData

    useEffect(() => {
        // Redirect if not admin
        if (!user || user.role !== 'admin') {
            navigate('/')
            toast.error('Not authorized as admin')
        }

        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            toast.success('Problem created successfully')
            setFormData({
                title: '',
                description: '',
                difficulty: 'Easy',
                category: 'JavaScript',
                starterCode: 'function solution() {\n  // Write your code here\n}',
                testCases: [{ input: '', output: '' }],
                solution: '',
                points: 10,
            })
        }

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, isSuccess, message, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleTestCaseChange = (index, field, value) => {
        const updatedTestCases = [...testCases]
        updatedTestCases[index][field] = value
        setFormData((prevState) => ({
            ...prevState,
            testCases: updatedTestCases,
        }))
    }

    const addTestCase = () => {
        setFormData((prevState) => ({
            ...prevState,
            testCases: [...prevState.testCases, { input: '', output: '' }],
        }))
    }

    const removeTestCase = (index) => {
        if (testCases.length > 1) {
            const updatedTestCases = [...testCases]
            updatedTestCases.splice(index, 1)
            setFormData((prevState) => ({
                ...prevState,
                testCases: updatedTestCases,
            }))
        } else {
            toast.error('You need at least one test case')
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()

        // Validate form data
        if (!title || !description || !solution || testCases.some(tc => !tc.input || !tc.output)) {
            toast.error('Please fill all required fields')
            return
        }

        // Format test cases correctly for the API
        const formattedTestCases = testCases.map(tc => ({
            input: JSON.stringify(tc.input),
            output: JSON.stringify(tc.output)
        }))

        const problemData = {
            ...formData,
            testCases: formattedTestCases,
            points: parseInt(points)
        }

        dispatch(createProblem(problemData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='admin-container'>
            <section className='heading'>
                <h1>Admin Dashboard</h1>
                <p>Create a new coding problem</p>
            </section>

            <section className='form admin-form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='title'>Problem Title</label>
                        <input
                            type='text'
                            id='title'
                            name='title'
                            value={title}
                            onChange={onChange}
                            placeholder='Enter a descriptive title'
                            required
                        />
                    </div>

                    <div className='form-row'>
                        <div className='form-group'>
                            <label htmlFor='category'>Category</label>
                            <select
                                id='category'
                                name='category'
                                value={category}
                                onChange={onChange}
                                required
                            >
                                <option value='JavaScript'>JavaScript</option>
                                <option value='React'>React</option>
                                <option value='Node.js'>Node.js</option>
                                <option value='Next.js'>Next.js</option>
                                <option value='MongoDB'>MongoDB</option>
                            </select>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='difficulty'>Difficulty</label>
                            <select
                                id='difficulty'
                                name='difficulty'
                                value={difficulty}
                                onChange={onChange}
                                required
                            >
                                <option value='Easy'>Easy</option>
                                <option value='Medium'>Medium</option>
                                <option value='Hard'>Hard</option>
                                <option value='Expert'>Expert</option>
                            </select>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='points'>Points</label>
                            <input
                                type='number'
                                id='points'
                                name='points'
                                value={points}
                                onChange={onChange}
                                min='5'
                                max='100'
                                required
                            />
                        </div>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='description'>Problem Description</label>
                        <textarea
                            id='description'
                            name='description'
                            value={description}
                            onChange={onChange}
                            placeholder='Describe the problem, requirements, and expected behavior'
                            rows='5'
                            required
                        ></textarea>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='starterCode'>Starter Code</label>
                        <textarea
                            id='starterCode'
                            name='starterCode'
                            value={starterCode}
                            onChange={onChange}
                            placeholder='Provide starter code for the users'
                            rows='5'
                            required
                        ></textarea>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='solution'>Solution Code</label>
                        <textarea
                            id='solution'
                            name='solution'
                            value={solution}
                            onChange={onChange}
                            placeholder='Provide the solution code'
                            rows='5'
                            required
                        ></textarea>
                    </div>

                    <div className='form-group'>
                        <label>Test Cases</label>
                        {testCases.map((testCase, index) => (
                            <div key={index} className='test-case'>
                                <div className='test-case-header'>
                                    <span>Test Case {index + 1}</span>
                                    {testCases.length > 1 && (
                                        <button
                                            type='button'
                                            className='btn btn-sm btn-danger'
                                            onClick={() => removeTestCase(index)}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                                <div className='test-case-inputs'>
                                    <div className='form-group'>
                                        <label htmlFor={`input-${index}`}>Input</label>
                                        <input
                                            type='text'
                                            id={`input-${index}`}
                                            value={testCase.input}
                                            onChange={(e) =>
                                                handleTestCaseChange(index, 'input', e.target.value)
                                            }
                                            placeholder='e.g., [1, 2, 3] or "test"'
                                            required
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor={`output-${index}`}>Expected Output</label>
                                        <input
                                            type='text'
                                            id={`output-${index}`}
                                            value={testCase.output}
                                            onChange={(e) =>
                                                handleTestCaseChange(index, 'output', e.target.value)
                                            }
                                            placeholder='e.g., 6 or "result"'
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type='button'
                            className='btn btn-sm add-test-case'
                            onClick={addTestCase}
                        >
                            <FaPlus /> Add Test Case
                        </button>
                    </div>

                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>
                            Create Problem
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Admin 