# Run tests on Beyns contour integral method

push!(LOAD_PATH, @__DIR__); using TestUtils
using NonlinearEigenproblems.NEPSolver
using NonlinearEigenproblems.Gallery
using Test
using LinearAlgebra

@testset "Beyn contour" begin
    nep=nep_gallery("dep0")
    @bench @testset "disk at origin" begin

        λ,v=contour_beyn(nep,displaylevel=1,radius=1,k=2,quad_method=:ptrapz)

        println(λ[1])
        M=compute_Mder(nep,λ[1])
        minimum(svdvals(M))
        @test minimum(svdvals(M))<eps()*1000

        println(λ[2])
        M=compute_Mder(nep,λ[2])
        @test minimum(svdvals(M))<eps()*1000


        λ,v=contour_beyn(nep,displaylevel=1,radius=1,k=2,quad_method=:ptrapz,N=100)
        M=compute_Mder(nep,λ[1])
        minimum(svdvals(M))
        @test minimum(svdvals(M))<eps()*1000

    end
    @bench @testset "shifted disk" begin

        λ,v=contour_beyn(nep,displaylevel=1,σ=-0.2,radius=1.5,k=4,quad_method=:ptrapz)

        println(λ[1])
        M=compute_Mder(nep,λ[1])
        minimum(svdvals(M))
        @test minimum(svdvals(M))<sqrt(eps())

        println(λ[2])
        M=compute_Mder(nep,λ[2])
        @test minimum(svdvals(M))<sqrt(eps())

        println(λ[3])
        M=compute_Mder(nep,λ[3])
        @test minimum(svdvals(M))<sqrt(eps())

        println(λ[4])
        M=compute_Mder(nep,λ[4])
        @test minimum(svdvals(M))<sqrt(eps())
    end

end
