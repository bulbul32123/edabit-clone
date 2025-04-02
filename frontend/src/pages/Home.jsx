import { Link } from 'react-router-dom'
import { FaCode, FaJsSquare, FaNodeJs, FaReact } from 'react-icons/fa'
import { SiNextdotjs, SiMongodb } from 'react-icons/si'

function Home() {
    return (
        <div className='home-container'>
            <section className='hero'>
                <h1>Sharpen Your Coding Skills</h1>
                <h2>
                    <FaJsSquare /> JavaScript &bull;
                    <FaReact /> React &bull;
                    <SiNextdotjs /> Next.js &bull;
                    <FaNodeJs /> Node.js &bull;
                    <SiMongodb /> MongoDB
                </h2>
                <p>
                    Challenge yourself with coding problems and build your skills
                    through practice. Join thousands of developers who are mastering
                    their web development journey.
                </p>
                <div className='button-group'>
                    <Link to='/problems' className='btn btn-primary'>
                        Start Coding
                    </Link>
                    <Link to='/register' className='btn btn-reverse'>
                        Sign Up for Free
                    </Link>
                </div>
            </section>

            <section className='features'>
                <div className='feature-card'>
                    <FaCode className='feature-icon' />
                    <h3>Solve Challenges</h3>
                    <p>
                        Practice with hundreds of challenges designed to improve your
                        problem-solving skills and coding technique.
                    </p>
                </div>
                <div className='feature-card'>
                    <FaJsSquare className='feature-icon' />
                    <h3>Modern JavaScript</h3>
                    <p>
                        Master modern JavaScript with challenges that cover ES6+ features
                        and best practices.
                    </p>
                </div>
                <div className='feature-card'>
                    <FaReact className='feature-icon' />
                    <h3>React & Next.js</h3>
                    <p>
                        Improve your frontend skills with React and Next.js specific
                        challenges and exercises.
                    </p>
                </div>
                <div className='feature-card'>
                    <FaNodeJs className='feature-icon' />
                    <h3>Node.js & MongoDB</h3>
                    <p>
                        Build your backend expertise with Node.js and MongoDB focused
                        problems.
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Home 