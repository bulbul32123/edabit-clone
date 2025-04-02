import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import MonacoEditor from 'react-monaco-editor'
import { getProblem, clearProblem } from '../features/problems/problemsSlice'
import { submitSolution, reset as resetSubmission } from '../features/submissions/submissionsSlice'
import Spinner from '../components/Spinner'
import { FaPlay, FaCheck, FaTimes } from 'react-icons/fa'

function ProblemPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [code, setCode] = useState('')
    const [mounted, setMounted] = useState(false)

    const { user } = useSelector((state) => state.auth)
    const { problem, isLoading: problemLoading } = useSelector(
        (state) => state.problems
    )
    const { submission, isLoading: submissionLoading, isSuccess, isError, message } = useSelector(
        (state) => state.submissions
    )

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

        dispatch(getProblem(id))

        setMounted(true)

        return () => {
            dispatch(clearProblem())
            dispatch(resetSubmission())
        }
    }, [id, user, navigate, dispatch])

    useEffect(() => {
        if (problem && !code && mounted) {
            setCode(problem.starterCode)
        }
    }, [problem, code, mounted])

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess && submission) {
            const statusMessage = submission.status === 'Accepted'
                ? 'Great job! Your solution passed all tests.'
                : submission.status === 'Wrong Answer'
                    ? 'Your solution failed some tests. Try again!'
                    : 'Error running your code. Check for syntax errors.';

            toast[submission.status === 'Accepted' ? 'success' : 'error'](statusMessage)
        }
    }, [isError, isSuccess, message, submission])

    const handleEditorChange = (newValue) => {
        setCode(newValue)
    }

    const handleSubmit = () => {
        if (!code.trim()) {
            toast.error('Please write some code first')
            return
        }

        dispatch(submitSolution({
            problemId: id,
            code,
        }))
    }

    const editorOptions = {
        selectOnLineNumbers: true,
        fontSize: 14,
        minimap: { enabled: false },
    }

    if (problemLoading || !problem) {
        return <Spinner />
    }

    return (
        <>
            <section className='problem-container'>
                <div className='problem-details'>
                    <h1>{problem.title}</h1>
                    <div className='problem-meta'>
                        <span className={`difficulty difficulty-${problem.difficulty.toLowerCase()}`}>
                            {problem.difficulty}
                        </span>
                        <span className='category'>{problem.category}</span>
                        <span className='points'>{problem.points} points</span>
                    </div>
                    <div className='problem-description'>
                        <h2>Description</h2>
                        <p>{problem.description}</p>
                    </div>
                </div>
                <div className='code-editor-container'>
                    <div className='editor-header'>
                        <h2>Solution</h2>
                        <button
                            className={`btn ${submissionLoading ? 'btn-disabled' : ''}`}
                            onClick={handleSubmit}
                            disabled={submissionLoading}
                        >
                            {submissionLoading ? (
                                'Running...'
                            ) : (
                                <>
                                    <FaPlay /> Run Code
                                </>
                            )}
                        </button>
                    </div>
                    <div className='editor-wrapper'>
                        <MonacoEditor
                            language="javascript"
                            theme="vs-dark"
                            value={code}
                            options={editorOptions}
                            onChange={handleEditorChange}
                            height="500px"
                        />
                    </div>
                    {submission && (
                        <div className={`submission-result result-${submission.status.toLowerCase().replace(' ', '-')}`}>
                            <div className='result-header'>
                                {submission.status === 'Accepted' ? (
                                    <><FaCheck /> Success</>
                                ) : (
                                    <><FaTimes /> {submission.status}</>
                                )}
                            </div>
                            <div className='result-details'>
                                <p>Execution time: {submission.executionTime}ms</p>
                                {submission.status === 'Accepted' && (
                                    <p>
                                        Congratulations! Your solution passed all test cases.
                                    </p>
                                )}
                                {submission.status === 'Wrong Answer' && (
                                    <p>
                                        Your solution didn't pass all test cases. Try again!
                                    </p>
                                )}
                                {submission.status === 'Error' && (
                                    <p>
                                        There was an error running your code. Check for syntax errors.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default ProblemPage 