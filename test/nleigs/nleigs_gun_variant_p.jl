# Gun: variant P (polynomial case; only repeated nodes)

push!(LOAD_PATH, normpath(@__DIR__, "..")); using TestUtils
using NonlinearEigenproblems
using Test

include(joinpath("..", "rk_helper", "gun_test_utils.jl"))

@bench @testset "NLEIGS: Gun variant P" begin
    verbose = displaylevel

    nep, Σ, _, v, nodes, funres = gun_init()

    # solve nlep
    lambda, X, res, solution_info = nleigs(nep, Σ, displaylevel=verbose > 0 ? 1 : 0, maxit=100, v=v, leja=0, nodes=nodes, reusefact=2, errmeasure=funres, return_details=verbose > 1)

    verify_lambdas(17, nep, X, lambda)

    if verbose > 1
        include("nleigs_residual_plot.jl")
        nleigs_residual_plot("Gun: variant P", solution_info, Σ; ylims=[1e-17, 1e-1])
    end
end
