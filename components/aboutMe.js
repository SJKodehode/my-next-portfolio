import CannonBall from "./wreckingBall"
export default function AboutMe() {
    return (
        <div className="flex flex-col justify-center w-full h-[60vh] items-center">
            <h2 className="text-3xl mb-16 font-bold">About Me</h2>
            <div className="w-fit flex text-lg font-normal gap-8">

                <div className="w-[30rem]">
                    <p className="mt-16 mb-4">A front-end developer with a passion for bold and exciting design. I have en extensive knowledge in modern web technologies that i use to get a fully tailored solution. </p>
                    <p className="mb-8 opacity-85">When I&apos;m not coding, I explore new technologies, stay updated with industry trends, and experiment with personal projects to apply what I&apos;ve learned.</p>
                </div>
                <div className=" rounded-4xl">
                    <CannonBall        
                    width={500}
                    height={300}
                    />

                </div>
            </div>
        </div>
    )
}