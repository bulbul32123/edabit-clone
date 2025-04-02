import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUserSubmissions, reset } from '../features/submissions/submissionsSlice'
import Spinner from '../components/Spinner'
import { FaCode, FaCheck, FaTrophy } from 'react-icons/fa'

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { submissions, isLoading, isError, message } = useSelector(
        (state) => state.submissions
    )

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/login')
        } else {
            dispatch(getUserSubmissions())
        }

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    // Calculate stats
    const totalSubmissions = submissions.length
    const acceptedSubmissions = submissions.filter(
        (submission) => submission.status === 'Accepted'
    ).length
    const uniqueProblems = new Set(
        submissions.map((submission) => submission.problem._id)
    ).size
    const uniqueSolved = new Set(
        submissions
            .filter((submission) => submission.status === 'Accepted')
            .map((submission) => submission.problem._id)
    ).size

    return (
        <>
            <section className='heading'>
                <h1>Welcome {user && user.name}</h1>
                <p>Your Coding Dashboard</p>
            </section>

            <section className='dashboard-stats'>
                <div className='stat-card'>
                    <FaCode className='stat-icon' />
                    <h2>{user.points}</h2>
                    <p>Total Points</p>
                </div>
                <div className='stat-card'>
                    <FaCheck className='stat-icon' />
                    <h2>{uniqueSolved}</h2>
                    <p>Problems Solved</p>
                </div>
                <div className='stat-card'>
                    <FaTrophy className='stat-icon' />
                    <h2>{acceptedSubmissions}/{totalSubmissions}</h2>
                    <p>Successful Submissions</p>
                </div>
            </section>

            <section className='content'>
                <h2>Recent Submissions</h2>
                {submissions.length > 0 ? (
                    <div className='submissions'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Problem</th>
                                    <th>Category</th>
                                    <th>Difficulty</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.slice(0, 10).map((submission) => (
                                    <tr key={submission._id}>
                                        <td>{submission.problem.title}</td>
                                        <td>{submission.problem.category}</td>
                                        <td>{submission.problem.difficulty}</td>
                                        <td>
                                            <span className={`status-${submission.status.toLowerCase().replace(' ', '-')}`}>
                                                {submission.status}
                                            </span>
                                        </td>
                                        <td>{new Date(submission.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <button
                                                className='btn btn-sm'
                                                onClick={() => navigate(`/problem/${submission.problem._id}`)}
                                            >
                                                Try Again
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='empty-state'>
                        <p>You haven't submitted any solutions yet.</p>
                        <button className='btn' onClick={() => navigate('/problems')}>
                            Start Solving
                        </button>
                    </div>
                )}
            </section>
        </>
    )
}

export default Dashboard 