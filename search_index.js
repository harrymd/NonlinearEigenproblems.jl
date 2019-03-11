var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "#NEP-PACK-1",
    "page": "Home",
    "title": "NEP-PACK",
    "category": "section",
    "text": "NEP-PACK is a package with implementations of methods to solve nonlinear eigenvalue problems of the type: Find (λv)inmathbbCtimesmathbbC^n such thatM(λ)v=0and vneq 0."
},

{
    "location": "#Getting-started-1",
    "page": "Home",
    "title": "Getting started",
    "category": "section",
    "text": "Install it as a registered  package in Julia\'s REPL package mode by typing ] add Nonline...:julia> ]\n(v1.0) pkg> add NonlinearEigenproblemsThen we can start to load the NEP-PACK packagejulia> using NonlinearEigenproblemsAs a first example we will solve the NEP associated with the matrix polynomialM(λ)=beginbmatrix13newline56endbmatrix+\nλbeginbmatrix34newline66endbmatrix+\nλ^2beginbmatrix10newline01endbmatrixThe following code creates this NEP, by constructing an object called PEP, an abbreviation for polynomial eigenvalue problem. It subsequencly solves it using the NEP solution method implemented in polyeig():julia> A0=[1.0 3; 5 6]; A1=[3.0 4; 6 6]; A2=[1.0 0; 0 1.0];\njulia> nep=PEP([A0,A1,A2])\nPEP(2, Array{Float64,2}[[1.0 3.0; 5.0 6.0], [3.0 4.0; 6.0 6.0], [1.0 0.0; 0.0 1.0]])\njulia> λ,v=polyeig(nep)\n(Complex{Float64}[1.36267+0.0im, -0.824084+0.280682im, -0.824084-0.280682im, -8.7145+0.0im], Complex{Float64}[-1.0+0.0im 0.739183-0.196401im 0.739183+0.196401im 0.627138+0.0im; 0.821812+0.0im -0.501408-0.375337im -0.501408+0.375337im 1.0+0.0im])You have now solved your first nonlinear eigenvalue problem with NEP-PACK.In order to verify that we have a solution, we can check that  M(λ) is singular, with a singular vector v such that M(λ)v=0:julia> λ1=λ[1]; v1=v[:,1];\njulia> using LinearAlgebra # the norm-function is in this Julia package\njulia> norm(A0*v1+λ1*A1*v1+λ1^2*v1)/norm(v1)\n1.1502634749464687e-14"
},

{
    "location": "#Accessing-more-complicated-applications-1",
    "page": "Home",
    "title": "Accessing more complicated applications",
    "category": "section",
    "text": "We have made benchmark examples available through the function nep_gallery:julia> nep=nep_gallery(\"dep0\",100);\njulia> size(nep)\n(100, 100)\njulia> λ,v=mslp(nep,tol=1e-10);\njulia> λ\n0.23169217667341738 - 2.1866254654451488e-16im\njulia> size(v)\n(100,)\njulia> resnorm=norm(compute_Mlincomb(nep,λ,v))\n3.124042808475689e-14Information about the gallery can be found by typing ?nep_gallery. The second arument in the call to nep_gallery is a problem parameter, in this case specifying that the  size of the problem should be 100. The example solves the problem with the NEP-algorithm MSLP. The parameter tol specifies the tolerance for iteration termination.note: Note\nAll the NEP-solvers have considerble documentation easily available. Every NEP-solver has documentation accompanied with at least one example, and references to corresponding research papers, which we strongly recommend you to cite if you use the method. This is available to you in Julia\'s repl-prompt. Type ?mslp and you will see an example how to use mslp and that citation credit should go to A. Ruhe, Algorithms for the nonlinear eigenvalue problem, SIAM J. Numer. Anal. 10 (1973) 674-689. This documentation is the same as the online documentation under the tab NEP Methods."
},

{
    "location": "#A-model-of-a-neuron-1",
    "page": "Home",
    "title": "A model of a neuron",
    "category": "section",
    "text": "The following (delay) differential equation models a neurondotx_1(t)=-kappa x_1(t)+betatanh(x_1(t-tau_3))+a_1tanh(x_2(t-tau_2))dotx_2(t)=-kappa x_2(t)+betatanh(x_2(t-tau_3))+a_2tanh(x_1(t-tau_1))See L. P. Shayer and S. A. Campbell.  Stability, bifurcation and multistability in a system of two coupled neurons with multiple time delays. SIAM J. Applied Mathematics , 61(2):673–700, 2000. It is also available as a first demo in DDE-BIFTOOL. The linear stability analysis of this problem requires the solution of a nonlinear eigenvalue problemM(λ)=-λI+A_0+A_1e^-tau_1λ+A_2e^-tau_2λ+A_3e^-tau_3λwhere the matrices are the Jacobian at the stationary solution. For the zero stationary solution, the matrices arekappa=0.5; a2=2.34; a1=1; beta=-1;\nA0=-kappa*[1 0; 0 1];\nA1=a2*[0 0; 1 0];\nA2=a1*[0 1; 0 0];\nA3=beta*[1 0; 0 1];We can now create the nonlinear eigenvalue problem and compute the stability by first creating the problemjulia> tauv=[0;0.2;0.2;1.5];\njulia> dep=DEP([A0, A1,   A2, A3],tauv);The constructor  DEP is an abbreviation for a delay eigenvalue problem, which is a NEP with exponential terms stemming from the stability analysis of a delay-differential equation. See types for other NEP-types. You can now solve this NEP, for instance, with the infinite Arnoldi method:julia> λ,V=iar_chebyshev(dep,maxit=100); # This takes some time the first time is run due to JIT-compilerThe figure in a demo of DDE-BIFTOOL http://ddebiftool.sourceforge.net/demos/neuron/html/demo1_stst.html#3 can be directly generated byusing PyPlot\n# Hardcoded/cached values in the documentation compilation  # hide\nλ=[ -0.09712795241565722 + 2.612885243197631e-19im # hide\n         0.30886599775839135 + 4.146563548756125e-18im # hide\n        -0.45584765486526174 + 1.6884551234089458im # hide\n         -0.4558476548652613 - 1.6884551234089418im # hide\n         -0.8832708076887316 + 5.325050575287575im # hide\n         -0.8832708076887288 - 5.3250505752875625im] # hide\nplot(real(λ),imag(λ),\"*\");\nxlabel(\"real(λ)\"); ylabel(\"imag(λ)\");\nsavefig(\"neuron_eigvals.svg\"); nothing # hide(Image: )tip: Tip\nThis problem is also available in the Gallery by calling dep=nep_gallery(\"neuron0\"). Most of the NEPs constructed in the tutorials are also available in corresponding gallery problems. See all gallery problems under NEP Gallery. In particular, note that the problems in the Berlin-Manchester collection of problems NLEVP are also directly available."
},

{
    "location": "#The-\"gun\"-benchmark-problem-1",
    "page": "Home",
    "title": "The \"gun\" benchmark problem",
    "category": "section",
    "text": "One of the most common benchmark problems for NEPs is the so-called \"gun\"-problem. It models an electromagnetic cavity, and it is directly available in the NEP-PACK gallery. (See gallery references or type ?nep_gallery at the repl-prompt.) This is how you can set it up and solve it with the block Newton method:julia> nep=nep_gallery(\"nlevp_native_gun\");\njulia> n=size(nep,1)\njulia> S=150^2*[1.0 0; 0 1]; V=[[1 0; 0 1]; zeros(n-2,2)];\njulia> (Z,X)=blocknewton(nep,S=S,X=V,displaylevel=1,armijo_factor=0.5,maxit=20)\nIteration 1: Error: 6.081316e+03\nIteration 2: Error: 1.701970e-02 Armijo scaling=0.031250\nIteration 3: Error: 1.814887e-02 Armijo scaling=0.250000\n...\nIteration 13: Error: 6.257442e-09\nIteration 14: Error: 2.525942e-15This algorithm returns a partial Schur factorization of the NEP, and therefore the eigenvalues of the small matrix Z are eigenvalues of the problem. An eigenpair of the NEP can be extracted by diagonalizing:julia> using LinearAlgebra\njulia> (Λ,P)=eigen(Z);\njulia> VV=X*P;  # Construct the eigenvector matrix\njulia> v=VV[:,1]; λ=Λ[1]\n61330.208714730004 + 63185.15983933589im\njulia> norm(compute_Mlincomb(nep,λ,v)) # Very small residual\n1.8270553408452648e-16If you use the NEP-algorithms for research, please give the author of the algorithm credit by citiation. The recommended citation can be found in the function documentation, e.g., ?blocknewton."
},

{
    "location": "#Your-own-NEP-nonlinearity-1",
    "page": "Home",
    "title": "Your own NEP nonlinearity",
    "category": "section",
    "text": "As an application researcher, we recommend that you first try to express your problem in the following form since it gives access to several efficient routines associated with the NEP, in turn making it possible to use many NEP-solvers. A problem that can be expressed as a (short) Sum of Products of Matrices and Functions can be represented with the objects of type SPMF in NEP-PACK. For instance, a problem with three termsM(λ) = A+λB+e^sin(λ2)Ccan be created byjulia> A=(1:4)*(1:4)\'+I; B=diagm(1 => [1,2,3]); C=ones(4,4);\njulia> f1= λ-> one(λ);\njulia> f2= λ-> λ;\njulia> f3= λ-> exp(sin(λ/2))\njulia> nep=SPMF_NEP([A,B,C],[f1,f2,f3]);The NEP can now be solved with many algorithms, e.g.,julia> λ,v=quasinewton(nep,λ=3)\n(3.176099007141426 + 0.0im, Complex{Float64}[37.1759+0.0im, -21.3016+0.0im, 0.0937992+0.0im, -1.15711+0.0im])Note that the functions f1,f2 and f3 have to be defined for scalar values and for matrices (in the matrix function sense, not elementwise sense). This is the reason f1 needs to be defined as one(λ), instead of just 1.As usual, you can check that we computed a sensible solution:julia> (A+B*λ+C*exp(sin(λ/2)))*v\n4-element Array{Complex{Float64},1}:\n  -6.586145128765412e-14 + 0.0im\n  2.8285461200559146e-14 + 0.0im\n -4.1550357082583515e-14 + 0.0im\n  -8.815768150428286e-15 + 0.0im"
},

{
    "location": "#What-now?-1",
    "page": "Home",
    "title": "What now?",
    "category": "section",
    "text": "Now you are ready to try out the tutorial on artificial boundary conditions or on the boundary element method or have a look at the examples in NEP methods and  NEP Gallery.(Image: To the top)"
},

{
    "location": "methods/#",
    "page": "NEP Methods",
    "title": "NEP Methods",
    "category": "page",
    "text": ""
},

{
    "location": "methods/#NEP-Methods-1",
    "page": "NEP Methods",
    "title": "NEP Methods",
    "category": "section",
    "text": "The NEP solver methods implemented in NEP-PACK, are accessed by the functions below. The functions all return λvw where λ is either a number (eigenvalue) a vector of eigenvalues v is either a vector containing an eigenvector or a matrix whose columns corresponding to the eigenvectors.The first parameter optional parameter in all NEP solver methods is a type. This type specifies which arithmetic should be used for the algorithm.Example:julia> nep=nep_gallery(\"dep0\")\njulia> λ,v=augnewton(Complex128,nep,v=ones(5))\n(0.8347353572199425 + 0.0im, Complex{Float64}[0.480386+0.0im, 0.0631636+0.0im, -0.136405+0.0im, 0.214274+0.0im, 0.378581+0.0im])\njulia> typeof(λ)\nComplex{Float64}\njulia> λ,v=augnewton(Float16,nep,v=ones(5))\n(Float16(0.8223), Float16[0.47388, 0.063904, -0.13843, 0.21692, 0.38306])\njulia> typeof(λ)\nFloat16"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.newton",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.newton",
    "category": "function",
    "text": "λ,v = newton([eltype],nep::NEP;[errmeasure,][tol,][maxit,][λ,][v,][c,][displaylevel,][armijo_factor=1,][armijo_max])\n\nApplies Newton-Raphsons method on the system of nonlinear equations with n+1 unknowns:\n\nM(λ)v=0\n\nc^Hv-1=0\n\nThe kwarg errmeasure is a function handle which can be used to specify how the error is measured to be used in termination (default is absolute residual norm). The iteration is continued until errmeasure is less than tol. λ and v are starting approximations. c is the orthogonalization vector.  If c=0 the current approximation will be used for the orthogonalization. armijo_factor specifies if an Armijo rule should be applied, and its value specifies the scaling factor of the step length (per reduction step). The variable armijo_max specifies the maximum number of step length reductions.\n\nExample\n\njulia> nep=nep_gallery(\"dep0\");\njulia> λ,v=newton(nep);\njulia> minimum(svdvals(compute_Mder(nep,λ)))\n1.6066157878930876e-16\n\nReferences\n\nNichtlineare Behandlung von Eigenwertaufgaben, Z. Angew. Math. Mech. 30 (1950) 281-282.\nA. Ruhe, Algorithms for the nonlinear eigenvalue problem, SIAM J. Numer. Anal. 10 (1973) 674-689\n\n\n\n\n\n"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.augnewton",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.augnewton",
    "category": "function",
    "text": "augnewton([eltype], nep::NEP; [errmeasure,][tol,][maxit,][λ,][v,][c,][displaylevel,][linsolvercreator,][armijo_factor,][armijo_max])\n\nRun the augmented Newton method. The method is equivalent to newton() in exact arithmetic,  but works only with operations on vectors of length n. The linsolvecreator is used to initiate linear solvers. See newton() for other parameters.\n\nExample\n\nThis illustrates the equivalence between newton and augnewton.\n\njulia> nep=nep_gallery(\"dep1\")\njulia> λ1,v1=newton(nep,maxit=20,v=ones(size(nep,1)),λ=0)\njulia> λ2,v2=augnewton(nep,maxit=20,v=ones(size(nep,1)),λ=0)\njulia> λ1-λ2\n0.0 + 0.0im\n\nReferences\n\nNichtlineare Behandlung von Eigenwertaufgaben, Z. Angew. Math. Mech. 30 (1950) 281-282.\nA. Ruhe, Algorithms for the nonlinear eigenvalue problem, SIAM J. Numer. Anal. 10 (1973) 674-689\n\n\n\n\n\n"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.resinv",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.resinv",
    "category": "function",
    "text": "λ,v = resinv([eltype],nep::NEP;[errmeasure,][tol,][maxit,][λ,][v,][c,][displaylevel,][armijo_factor=1,][armijo_max,][linsolvecreator])\n\nApplies residual inverse iteration method for nonlinear eigenvalue problems. The kwarg linsolvecreator is a function which specifies how the linear system is created. The function calls compute_rf for the computation of the Rayleigh functional. See newton() for other parameters.\n\nExample\n\nThe example shows how to specify if the method should run in real or complex mode (or any other Number type).\n\njulia> nep=nep_gallery(\"qdep0\");\njulia> λ,v=resinv(nep,λ=-2,v=ones(size(nep,1)))\njulia> typeof(λ)\nComplex{Float64}\njulia> norm(compute_Mlincomb(nep,λ,v))\n1.817030659827106e-14\njulia> λ,v=resinv(Float64,nep,λ=-2,v=ones(size(nep,1)))\njulia> typeof(λ)\nFloat64\njulia> norm(compute_Mlincomb(nep,λ,v))\n1.817030659827106e-14\n\nReferences\n\nA. Neumaier, Residual inverse iteration for the nonlinear eigenvalue problem, SIAM J. Numer. Anal. 22 (1985) 914-923\n\n\n\n\n\n"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.quasinewton",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.quasinewton",
    "category": "function",
    "text": "quasinewton([T=ComplexF64],nep,[errmeasure,][tol,][maxit,][λ,][v][ws][displaylevel][linsolvercreator,][armijo_factor,][armijo_max])\n\nAn implementation of the quasi-Newton approach referred to as quasi-Newton 2 in the reference. The method involves one linear system solve per iteration corresponding with the matrix M(λ), where λ is constant. The vector ws is a representation of the normalization, in the sense that c^T=w_s^TM(λ), where all iterates satisfy c^Tx_i=1. See newton() for other parameters.\n\nExample\n\njulia> nep=nep_gallery(\"pep0\")\njulia> λ,v=quasinewton(nep,v=ones(size(nep,1)));\njulia> norm(compute_Mlincomb(nep,λ,v))/norm(v)\n6.301479387102376e-15\n\nReferences\n\nJarlebring, Koskela, Mele, Disguised and new Quasi-Newton methods for nonlinear eigenvalue problems, Numer. Algorithms, 79:311-335, 2018. preprint\n\n\n\n\n\n"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.mslp",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.mslp",
    "category": "function",
    "text": " mslp([eltype],nep::NEP;[errmeasure,][tol,][maxit,][λ,][v,][displaylevel,][eigsolvertype::Type][armijo_factor=1,][armijo_max])\n\nRuns the method of successive linear problems. The  method requires the solution of a generalized eigenvalue problem in every iteration. The method used for the eigenvalue computation is specified in eigsolvertype. See newton for other parameters.\n\nExample\n\nCreate a rational NEP with SPMFs.\n\njulia> Av=[ones(3,3),eye(3,3),triu(ones(3,3))];\njulia> fv=[S-> S, S -> S^2, S::AbstractArray -> inv(Matrix(S)-eye(S)*10)]\njulia> nep=SPMF_NEP(Av,fv)\njulia> (λ,v)=mslp(nep)\njulia> compute_Mlincomb(nep,λ,v)\n3-element Array{Complex{Float64},1}:\n -1.38778e-17+1.65715e-18im\n -5.55112e-17+1.30633e-17im\n -4.16334e-17-1.54436e-17im\n\nReferences\n\nA. Ruhe, Algorithms for the nonlinear eigenvalue problem, SIAM J. Numer. Anal. 10 (1973) 674-689\n\n\n\n\n\n"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.sgiter",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.sgiter",
    "category": "function",
    "text": "λ,v = sgiter([eltype],nep::NEP,j::Integer;[λ_min,][λ_max,][λ,][errmeasure,][tol,][maxit,][displaylevel,][eigsolvertype::Type,])\n\nFinds the j-th eigenvalue of the NEP using safeguarded iteration, with eigenvalue numbering according to min-max theory. The method only works for Hermitian problems, and the eigenvalues are assumed to be real. If an interval [λ_min,λ_max] is given, then the Rayleigh functional is assumed to be unique on the interval. If no interval is given, then the minimum solution is always taken. The method requires the computation of (all) eigenvalues of a matrix. The eigsolvertype is a Type that specifies which eigevalue solver is used inside the algorithm. See newton for the meaning of other kwargs.\n\nExample\n\njulia> nep = nep_gallery(\"real_quadratic\");\njulia> λ,v = sgiter(nep, 1, λ_min = -10, λ_max = 0,  λ = -10, maxit = 100);\njulia> minimum(svdvals(compute_Mder(nep,λ)))\n0.0\njulia> norm(v)\n1.0\n\nReferences\n\nV. Mehrmann and H. Voss, Nonlinear eigenvalue problems: a challenge for modern eigenvalue methods, GAMM‐Mitteilungen 27.2 (2004): 121-152.\nH. Voss and B. Werner, Solving sparse nonlinear eigenvalue problems. Technical Report 82/4, Inst. f. Angew. Mathematik, Universität Hamburg, 1982.\nB. Werner. Das Spektrum von Operatorenscharen mit verallgemeinerten Rayleighquotienten. PhD thesis, Fachbereich Mathematik, Universität Hamburg, 1970\n\n\n\n\n\n"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.rfi",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.rfi",
    "category": "function",
    "text": "rfi(nep,nept,[λ=0,][errmeasure=default_errmeasure,][tol=eps()*100,][maxit=100,][v=randn,][u=randn,][displaylevel=0,][linsolvecreator=default_linsolvecreator,])\n\nThis is an implementation of the two-sided Rayleigh functional Iteration (RFI) to compute an eigentriplet of the problem specified by nep. This method requires the transpose of the NEP, specified in nept. λ, u and v are initial guesses for the eigenvalue, the right eigenvector and the left eigenvector respectively. A NoConvergenceException is thrown if an eigentriplet is not found in maxit iterations.\n\nExample\n\njulia> nep=nep_gallery(\"dep0\");\njulia> nept=DEP([nep.A[1]\',nep.A[2]\'])\njulia> λ,v,u=rfi_b(nep,nept)\njulia> compute_resnorm(nep,λ,v) % v is a right eigenvector\n4.347204570675246e-16\njulia> compute_resnorm(nept,λ,u) % u is a left eigenvector\n7.173081573164097e-16\n\nReference\n\nAlgorithm 4 in  Schreiber, Nonlinear Eigenvalue Problems: Newton-type Methods and Nonlinear Rayleigh Functionals, PhD thesis, TU Berlin, 2008.\n\n\n\n\n\n"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.blocknewton",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.blocknewton",
    "category": "function",
    "text": "(S,X)=blocknewton(nep [S,] [X,] [errmeasure,] [tol,] [maxit,] [armijo_factor,] [armijo_max,] [displaylevel])\n\nApplies the block Newton method to nep::AbstractSPMF. The method computes an invariant pair (S,X) using the block Newton approach of Kressner. The variables S,X correspond to starting approximations. The function errmeasure shoule be defined for errmeasure(S,X) and meausures the error in the pair (S,X). See newton() for the other parameters.\n\nExample\n\nThe example shows that compute_MM() becomes zero when a solution has been computed.\n\njulia> nep=nep_gallery(\"dep0\",3);\njulia> (S,X)= blocknewton(nep)\njulia> compute_MM(nep,S,X)\n3×2 Array{Complex{Float64},2}:\n -2.22045e-16-1.0842e-19im  -2.08167e-17+0.0im\n  1.94289e-16-1.0842e-19im  -5.55112e-17-6.77626e-20im\n  7.63278e-17-1.0842e-19im   2.77556e-17-2.71051e-20im\n\nThis example solves the gun problem from the Berlin-Manchester collection\n\njulia> using NonlinearEigenproblems.Gallery\njulia> nep=nep_gallery(\"nlevp_native_gun\");\njulia> II=[1.0 0; 0 1]; S=150^2*II; V=[II;zeros(size(nep,1)-2,2)];\njulia> (Z,X)=blocknewton(nep,S=S,X=V,displaylevel=1,armijo_factor=0.5,maxit=20)\nIteration 1: Error: 6.081316e+03\nIteration 2: Error: 1.701970e-02 Armijo scaling=0.031250\nIteration 3: Error: 1.814887e-02 Armijo scaling=0.250000\n...\nIteration 13: Error: 6.257442e-09\nIteration 14: Error: 2.525942e-15\n\nReferences\n\nD. Kressner A block Newton method for nonlinear eigenvalue problems, Numer. Math., 114 (2) (2009), pp. 355-372\n\n\n\n\n\n"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.newtonqr",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.newtonqr",
    "category": "function",
    "text": "λ,v = newtonqr([eltype],nep::NEP;[errmeasure,][tol,][maxit,][λ,][v,][c,][displaylevel])\n\nThis function implements the Newton-QR method as formulated in the reference. The method ivolves the computation of a rank-revealing QR factorization of M(λ), with the idea that on convergence the the last diagonal element Rnn of the upper-triangular matrix R becomes zero as a result of M(λ) becoming singular. Since the computation of a QR factorization is expensive, it is advisable to use this method for problems of small size or problems with a certain structure that makes the QR computation less expensive. See newton for description of the function arguements.\n\nExample\n\njulia> nep=nep_gallery(\"pep0\")\njulia> λ,v=newtonqr(nep,v=ones(size(nep,1)));\njulia> norm(compute_Mlincomb(nep,λ,v))/norm(v)\n1.0442559980785471e-14\n\nReferences\n\nKublanovskaya, V. N., (1970).  On an approach to the solution of the generalized latent value problem for λ-matrices, SIAM J. Numer. Anal. 7, 532–537\nGüttel, S., & Tisseur, F. (2017). The nonlinear eigenvalue problem. Acta Numerica, 26, 1-94. doi:10.1017/S0962492917000034\n\n\n\n\n\n"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.implicitdet",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.implicitdet",
    "category": "function",
    "text": "λ,v = implicitdet([eltype],nep::NEP;[errmeasure,][tol,][maxit,][λ,][v,][c,][displaylevel])\n\nThis function implements the Implicit determinant method as formulated Algorithm 4.3 in the reference. The method applies Newton-Raphson to the equation det(M(λ))det(G(λ)) = 0, where G(λ) is a saddle point matrix with M(λ) in the (1,1) block. The (2,1) and (1,2) blocks of G(λ) are set to c^H and c respectively. Note that G(λ) can be non-singular even when M(λ) is singular. See reference for more information. See newton for description of the function arguements.\n\nExample\n\njulia> nep=nep_gallery(\"pep0\")\njulia> λ,v=implicitdet(nep,v=ones(size(nep,1)));\njulia> norm(compute_Mlincomb(nep,λ,v))/norm(v)\n3.75723275262885e-14\n\nReferences\n\nSpence, A., & Poulton, C. (2005). Photonic band structure calculations using nonlinear eigenvalue techniques, J. Comput. Phys., 204 (2005), pp. 65–8\nGüttel, S., & Tisseur, F. (2017). The nonlinear eigenvalue problem. Acta Numerica, 26, 1-94. doi:10.1017/S0962492917000034\n\n\n\n\n\n"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.broyden",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.broyden",
    "category": "function",
    "text": "S,V = broyden([eltype,]nep::NEP[,approxnep::NEP];kwargs)\n\nRuns Broydens method (with deflation) for the nonlinear eigenvalue problem defined by nep. An approximate nep can be provided which is used as an initialization of starting matrix/vectors.\n\nThe method computes an invariant pair and can therefore find several eigenvalues. The retured value is (S,V) is an invariant pair and the eigenvalues are on the diagonal of S.\n\nExample\n\njulia> nep=nep_gallery(\"dep0\");\njulia> S,V=broyden(nep);\njulia> λ=S[1,1]\n-0.3587189459686267 - 3.0010731412746105e-31im\njulia> minimum(svdvals(compute_Mder(nep,λ)))\n1.6066157878930856e-16\njulia> λ=S[2,2]\n-0.04093521177097334 + 1.486011530941621im\njulia> minimum(svdvals(compute_Mder(nep,λ)))\n4.159109513753696e-16\njulia> λ=S[3,3]\n0.8347353572199486 + 1.5032076225139986e-14im\njulia> minimum(svdvals(compute_Mder(nep,λ)))\n1.296144276122994e-14\njulia> broyden(nep,displaylevel=2,check_error_every=1);  % Prints out a lot more convergence info\n\nReferences\n\nJarlebring, Broyden’s method for nonlinear eigenproblems, 2018, https://arxiv.org/pdf/1802.07322\n\n\n\n\n\n"
},

{
    "location": "methods/#Newton-type-methods-1",
    "page": "NEP Methods",
    "title": "Newton type methods",
    "category": "section",
    "text": "newtonaugnewtonresinvquasinewtonmslpsgiterrfiblocknewtonnewtonqrimplicitdetbroyden"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.nlar",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.nlar",
    "category": "function",
    "text": "function nlar([eltype],nep::ProjectableNEP,[orthmethod=ModifiedGramSchmidt],[neigs=10],[errmeasure=default_errmeasure],[tol=eps(real(T))*100],[maxit=100],[λ0=0],[v0=randn(T,size(nep,1))],[displaylevel=0],[linsolvercreator=default_linsolvercreator],[R=0.01],[eigval_sorter=residual_eigval_sorter],[qrfact_orth=false],[max_subspace=100],[num_restart_ritz_vecs=8],[inner_solver_method=DefaultInnerSolver])\n\nThe function implements the Nonlinear Arnoldi method, which finds neigs eigenpairs(or throws a NoConvergenceException) by projecting the problem to a subspace that is expanded in the course  of the algorithm. The basis is orthogonalized either by using the QR method if qrfact_orth is true or else by an orthogonalization method orthmethod). This entails solving a smaller projected problem using a method specified by inner_solver_method. (λ0,v0) is the initial guess for the eigenpair. linsolvercreator specifies how the linear system is created and solved. R is a parameter used by the function specified by eigval_sorter to reject those ritz values that are within a distance R from any of the converged eigenvalues, so that repeated convergence to the same eigenpair can be avoided. max_subspace is the maximum allowable size of the basis befor the algorithm restarts using a basis made of num_restart_ritz_vecs ritz vectors and the eigenvectors that the algorithm has converged to.\n\nExample\n\njulia> nep=nep_gallery(\"dep0_tridiag\");\njulia> λ,v=nlar(nep,tol=1e-5,neigs=1,maxit=50);\njulia> norm(compute_Mlincomb(nep,λ[1],v))\n7.722757003764154e-7\n\nReferences\n\nH. Voss, An Arnoldi method for nonlinear eigenvalue problems. BIT. Numer. Math. 44: 387-401, 2004.\n\n\n\n\n\n"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.jd_betcke",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.jd_betcke",
    "category": "function",
    "text": "jd_betcke([eltype]], nep::ProjectableNEP; [Neig=1], [tol=eps(real(T))*100], [maxit=100], [λ=zero(T)], [orthmethod=DGKS],  [errmeasure=default_errmeasure], [linsolvercreator=default_linsolvercreator], [v = randn(size(nep,1))], [displaylevel=0], [inner_solver_method=DefaultInnerSolver], [projtype=:PetrovGalerkin], [target=zero(T)])\n\nThe function computes eigenvalues using Jacobi-Davidson method, which is a projection method. The projected problems are solved using a solver spcified through the type inner_solver_method. For numerical stability the basis is kept orthogonal, and the method for orthogonalization is specified by orthmethod, see the package IterativeSolvers.jl. The function tries to compute Neig number of eigenvalues, and throws a NoConvergenceException if it cannot. The value λ and the vector v are initial guesses for an eigenpair. linsolvercreator is a function which specifies how the linear system is created and solved. The target is the center around which eiganvlues are computed. errmeasure is a function handle which can be used to specify how the error is measured. By default the method uses a Petrov-Galerkin framework, with a trial (left) and test (right) space, hence W^H T(λ) V is the projection considered. By specifying  projtype to be :Galerkin then W=V.\n\nExample\n\njulia> nep=nep_gallery(\"dep0\",50);\njulia> λ,v=jd_betcke(nep,tol=1e-5,maxit=20);\njulia> norm(compute_Mlincomb(nep,λ[1],v[:,1]))\n1.2277391762692744e-8\n\nReferences\n\nT. Betcke and H. Voss, A Jacobi-Davidson-type projection method for nonlinear eigenvalue problems. Future Gener. Comput. Syst. 20, 3 (2004), pp. 363-372.\nH. Voss, A Jacobi–Davidson method for nonlinear eigenproblems. In: International Conference on Computational Science. Springer, Berlin, Heidelberg, 2004. pp. 34-41.\n\nSee also\n\nC. Effenberger, Robust successive computation of eigenpairs for nonlinear eigenvalue problems. SIAM J. Matrix Anal. Appl. 34, 3 (2013), pp. 1231-1256.\n\n\n\n\n\n"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.jd_effenberger",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.jd_effenberger",
    "category": "function",
    "text": "jd_effenberger([eltype]], nep::ProjectableNEP; [maxit=100], [Neig=1], [inner_solver_method=DefaultInnerSolver], [orthmethod=DGKS], [linsolvercreator=default_linsolvercreator], [tol=eps(real(T))*100], [λ=zero(T)], [v = rand(T,size(nep,1))], [target=zero(T)],  [displaylevel=0])\n\nThe function computes eigenvalues using the Jacobi-Davidson method, which is a projection method. Repreated eigenvalues are avoided by using deflation, as presented in the reference by Effenberger. The projected problems are solved using a solver spcified through the type inner_solver_method. For numerical stability the basis is kept orthogonal, and the method for orthogonalization is specified by orthmethod, see the package IterativeSolvers.jl. The function tries to compute Neig number of eigenvalues, and throws a NoConvergenceException if it cannot. The value λ and the vector v are initial guesses for an eigenpair. linsolvercreator is a function which specifies how the linear system is created and solved. The target is the center around which eiganvalues are computed.\n\nExample\n\njulia> nep=nep_gallery(\"dep0\",100);\njulia> λ,v=jd_effenberger(nep,maxit=30,v=ones(size(nep,1)),λ=0);\njulia> norm(compute_Mlincomb(nep,λ[1],v[:,1]))\n1.902783771915309e-14\n\nReferences\n\nC. Effenberger, Robust successive computation of eigenpairs for nonlinear eigenvalue problems. SIAM J. Matrix Anal. Appl. 34, 3 (2013), pp. 1231-1256.\n\nSee also\n\nT. Betcke and H. Voss, A Jacobi-Davidson-type projection method for nonlinear eigenvalue problems. Future Gener. Comput. Syst. 20, 3 (2004), pp. 363-372.\nH. Voss, A Jacobi–Davidson method for nonlinear eigenproblems. In: International Conference on Computational Science. Springer, Berlin, Heidelberg, 2004. pp. 34-41.\n\n\n\n\n\n"
},

{
    "location": "methods/#Projection-methods-1",
    "page": "NEP Methods",
    "title": "Projection methods",
    "category": "section",
    "text": "nlar\njd_betcke\njd_effenberger"
},

{
    "location": "methods/#Arnoldi-and-Krylov-based-methods-1",
    "page": "NEP Methods",
    "title": "Arnoldi and Krylov based methods",
    "category": "section",
    "text": ""
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.iar",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.iar",
    "category": "function",
    "text": "iar(nep,[maxit=30,][σ=0,][γ=1,][linsolvecreator=default_linsolvecreator,][tolerance=eps()*10000,][Neig=6,][errmeasure=default_errmeasure,][v=rand(size(nep,1),1),][displaylevel=0,][check_error_every=1,][orthmethod=DGKS])\n\nRun the infinite Arnoldi method on the nonlinear eigenvalue problem stored in nep.\n\nThe target σ is the center around which eiganvalues are computed. The kwarg errmeasure is a function handle which can be used to specify how the error is measured to be used in termination (default is absolute residual norm). A Ritz pair λ and v is flagged a as converged (to an eigenpair) if errmeasure is less than tol. The vector v is the starting vector for constructing the Krylov space. The orthogonalization method, used in contructing the orthogonal basis of the Krylov space, is specified by orthmethod, see the package IterativeSolvers.jl. The iteration is continued until Neig Ritz pairs converge. This function throws a NoConvergenceException if the wanted eigenpairs are not computed after maxit iterations. The linsolvercreator is a function which specifies how the linear system is created and solved.\n\nExample\n\njulia> using NonlinearEigenproblems, LinearAlgebra\njulia> nep=nep_gallery(\"dep0\",100);\njulia> v0=ones(size(nep,1));\njulia> λ,v=iar(nep;v=v0,tol=1e-5,Neig=3);\njulia> norm(compute_Mlincomb!(nep,λ[1],v[:,1])) # Is it an eigenvalue?\njulia> λ    # print the computed eigenvalues\n3-element Array{Complex{Float64},1}:\n -0.15606211475666945 - 0.12273439802763578im\n -0.15606211475666862 + 0.12273439802763489im\n  0.23169243065648365 - 9.464790582509696e-17im\n\nReferences\n\nAlgorithm 2 in Jarlebring, Michiels Meerbergen, A linear eigenvalue algorithm for the nonlinear eigenvalue problem, Numer. Math, 2012\n\n\n\n\n\n"
},

{
    "location": "methods/#IAR-1",
    "page": "NEP Methods",
    "title": "IAR",
    "category": "section",
    "text": "The Infinite ARnoldi method.iar"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.iar_chebyshev",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.iar_chebyshev",
    "category": "function",
    "text": "iar_chebyshev(nep,[maxit=30,][σ=0,][γ=1,][linsolvecreator=default_linsolvecreator,][tolerance=eps()*10000,][Neig=6,][errmeasure=default_errmeasure,][v=rand(size(nep,1),1),][displaylevel=0,][check_error_every=1,][orthmethod=DGKS][a=-1,][b=1,][compute_y0_method=ComputeY0ChebAuto])\n\nRun the infinite Arnoldi method (Chebyshev version) on the nonlinear eigenvalue problem stored in nep.\n\nThe target σ is the center around which eiganvalues are computed. The kwarg errmeasure is a function handle which can be used to specify how the error is measured to be used in termination (default is absolute residual norm). A Ritz pair λ and v is flagged a as converged (to an eigenpair) if errmeasure is less than tol. The vector v is the starting vector for constructing the Krylov space. The orthogonalization method, used in contructing the orthogonal basis of the Krylov space, is specified by orthmethod, see the package IterativeSolvers.jl. The iteration is continued until Neig Ritz pairs converge. This function throws a NoConvergenceException if the wanted eigenpairs are not computed after maxit iterations. The linsolvercreator is a function which specifies how the linear system is created and solved. The kwarg compute_y0_method specifying how the next vector of the Krylov space (in Chebyshev format) can be computed. See compute_y0_cheb in the module NEPSolver with the command ?NEPSolver.compute_y0_cheb.\n\nExample\n\njulia> using NonlinearEigenproblems, LinearAlgebra\njulia> nep=nep_gallery(\"dep0\",100);\njulia> v0=ones(size(nep,1));\njulia> λ,v=iar_chebyshev(nep;v=v0,tol=1e-5,Neig=3);\njulia> norm(compute_Mlincomb!(nep,λ[1],v[:,1])) # Is it an eigenvalue?\njulia> λ    # print the computed eigenvalues\n3-element Array{Complex{Float64},1}:\n  -0.1560621117389876 - 0.12273439561483537im\n -0.15606211173898707 + 0.12273439561483517im\n  0.23169252042880578 - 7.86196165647416e-17im\n\nReferences\n\nAlgorithm 2 in Jarlebring, Michiels Meerbergen, A linear eigenvalue algorithm for the nonlinear eigenvalue problem, Numer. Math, 2012\n\n\n\n\n\n"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.compute_y0_cheb",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.compute_y0_cheb",
    "category": "function",
    "text": "y0 = compute_y0_cheb([eltype],nep::NEPTypes.DEP,::Type{ComputeY0ChebPEP},X,Y,M0inv,precomp::AbstractPrecomputeData)\n\nComputes the vector y0 used in iar_chebyshev given by\n\n y_0 = sum_i=1^N T_i-1(γ) x_i - sum_j=1^m A_j left( sum_i=1^N+1 T_i-1(-ρ tau_j+γ) y_i right )\n\nwhere T(c) is the vector containing T_i(c) as coefficients, where T_i is the i-th Chebyshev polynomial of the first kind.\n\n\n\n\n\ny0 = compute_y0_cheb([eltype],nep::NEPTypes.PEP,::Type{ComputeY0ChebPEP},X,Y,M0inv,precomp::AbstractPrecomputeData)\n\nComputes the vector y0 used in iar_chebyshev given by\n\n y_0 = sum_j=0^d-1 A_j+1 x D^j T(c) - y T(c)\n\nwhere T(c) is the vector containing T_i(c) as coefficients, where T_i is the i-th Chebyshev polynomial of the first kind and D is the derivation matrix in Chebyshev basis.\n\n\n\n\n\ny0 = compute_y0_cheb([eltype],nep::NEPTypes.SPMF_NEP,::Type{ComputeY0ChebPEP},X,Y,M0inv,precomp::AbstractPrecomputeData)\n\nComputes the vector y0 used in iar_chebyshev given by\n\n y_0= sum_j=0^m M^(j)(mu) X b_j left( D_N right) T_N(c) - Y T_N(c)\n\nwhere T(c) is the vector containing T_i(c) as coefficients, where T_i is the i-th Chebyshev polynomial of the first kind and b_j(lambda)=(f_j(0)-f_j(lambda))lambda=flambda0 are divided differences.\n\n\n\n\n\ny0 = compute_y0_cheb([eltype],nep::NEPTypes.NEP,::Type{ComputeY0ChebNEP},X,Y,M0inv,precomp::AbstractPrecomputeData)\n\nComputes the vector y0 used in iar_chebyshev defined as\n\n y_0 =left( sum_i=0^N-1 B left( fracdd theta right) hat T_i(theta) x_i right)(0) - sum_i=0^N T_i(c) y_i\n\nwhere T_i is the i-th Chebyshev polynomial of the first kind, $ \\ hat T_i$ is the i-th Chebyshev polynomial of the first kind for the interval [a,b]. For a generic nep, this quantity is computed by converting polynomials in monomial basis. This procedure may be numerical unstable if many iterations are required. If for the specific nep a closed formula is available, we suggest to overload this function.\n\n\n\n\n\n"
},

{
    "location": "methods/#IAR-Chebyshev-1",
    "page": "NEP Methods",
    "title": "IAR Chebyshev",
    "category": "section",
    "text": "A Chebyshev version of the IAR method.iar_chebyshevFor the iar_chebyshev the following compute_y0_cheb method is needed, in order to avoid explicit conversions between the Chebyshev basis and the monimial basis.NEPSolver.compute_y0_cheb"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.tiar",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.tiar",
    "category": "function",
    "text": "tiar(nep,[maxit=30,][σ=0,][γ=1,][linsolvecreator=default_linsolvecreator,][tolerance=eps()*10000,][Neig=6,][errmeasure=default_errmeasure,][v=rand(size(nep,1),1),][displaylevel=0,][check_error_every=1,][orthmethod=DGKS])\n\nRun the tensor infinite Arnoldi method on the nonlinear eigenvalue problem stored in nep.\n\nThe target σ is the center around which eiganvalues are computed. The kwarg errmeasure is a function handle which can be used to specify how the error is measured to be used in termination (default is absolute residual norm). A Ritz pair λ and v is flagged a as converged (to an eigenpair) if errmeasure is less than tol. The vector v is the starting vector for constructing the Krylov space. The orthogonalization method, used in contructing the orthogonal basis of the Krylov space, is specified by orthmethod, see the package IterativeSolvers.jl. The iteration is continued until Neig Ritz pairs converge. This function throws a NoConvergenceException if the wanted eigenpairs are not computed after maxit iterations. The linsolvercreator is a function which specifies how the linear system is created and solved.\n\nExample\n\njulia> using NonlinearEigenproblems, LinearAlgebra\njulia> nep=nep_gallery(\"dep0\",100);\njulia> v0=ones(size(nep,1));\njulia> λ,v=tiar(nep;v=v0,tol=1e-5,Neig=3);\njulia> norm(compute_Mlincomb!(nep,λ[1],v[:,1])) # Is it an eigenvalue?\njulia> λ    # print the computed eigenvalues\n3-element Array{Complex{Float64},1}:\n -0.1560621147566685 + 0.12273439802763504im\n -0.1560621147566693 - 0.1227343980276357im\n 0.23169243065648332 - 4.699260229885766e-17im\n\n\nReferences\n\nAlgorithm 2 in Jarlebring, Mele, Runborg, The Waveguide Eigenvalue Problem and the Tensor Infinite Arnoldi Method, SIAM J. Scient. computing, 39 (3), A1062-A1088, 2017\n\n\n\n\n\n"
},

{
    "location": "methods/#TIAR-1",
    "page": "NEP Methods",
    "title": "TIAR",
    "category": "section",
    "text": "The Tensor Infinite ARnoldi method.tiar"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.infbilanczos",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.infbilanczos",
    "category": "function",
    "text": "λv,V,U=infbilanczos([eltype],nep, nept,[linsolvecreator,][linsolvertcreator,][v,][u,][σ,][γ,][tol,][Neig,][errmeasure,][displaylevel,][maxit,][check_error_every])\n\nExecutes the Infinite Bi-Lanczos method on the problem defined by nep::NEP and nept::NEP. nep:NEP is the original nonlinear eigenvalue problem and nept::NEP is its (hermitian) transpose: M(λ^*)^H.  v and u are starting vectors, σ is the shift and γ the scaling.  See newton() for other parameters.\n\nExample:\n\njulia> nep=nep_gallery(\"dep0\");\njulia> A=get_Av(nep); fv=get_fv(nep);\njulia> At=[copy(A[1]\'),copy(A[2]\'),copy(A[3]\')]\njulia> nept=SPMF_NEP(At,fv); # Create the transposed NEP\njulia> λv,V=infbilanczos(nep,nept,Neig=3)\njulia> norm(compute_Mlincomb(nep,λv[1],V[:,1]))\n\nReferences:\n\nThe infinite bi-Lanczos method for nonlinear eigenvalue problems, S. W. Gaaf and E. Jarlebring, SIAM J. Sci. Comput. 39:S898-S919, 2017, preprint\n\n\n\n\n\n"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.ilan",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.ilan",
    "category": "function",
    "text": "ilan(nep,[maxit=30,][σ=0,][γ=1,][linsolvecreator=default_linsolvecreator,][tolerance=eps()*10000,][Neig=6,][errmeasure=default_errmeasure,][v=rand(size(nep,1),1),][displaylevel=0,][check_error_every=30,][orthmethod=DGKS])\n\nRun the infinite Lanczos method on the symmetric nonlinear eigenvalue problem stored in nep.\n\nThe target σ is the center around which eiganvalues are computed. The kwarg errmeasure is a function handle which can be used to specify how the error is measured to be used in termination (default is absolute residual norm). A Ritz pair λ and v is flagged a as converged (to an eigenpair) if errmeasure is less than tol. The vector v is the starting vector for constructing the Krylov space. The orthogonalization method, used in contructing the orthogonal basis of the Krylov space, is specified by orthmethod, see the package IterativeSolvers.jl. The iteration is continued until Neig Ritz pairs converge. This function throws a NoConvergenceException if the wanted eigenpairs are not computed after maxit iterations. The linsolvercreator is a function which specifies how the linear system is created and solved.\n\nExample\n\njulia> using NonlinearEigenproblems, LinearAlgebra\njulia> nep=nep_gallery(\"dep_symm_double\",10);\njulia> v0=ones(size(nep,1));\njulia> λ,v=ilan(nep;v=v0,tol=1e-5,Neig=3);\njulia> norm(compute_Mlincomb!(nep,λ[1],v[:,1])) # Is it an eigenvalue?\njulia> λ    # print the computed eigenvalues\n3-element Array{Complex{Float64},1}:\n 0.04103537900075572 - 1.6342212662372832e-19im\n 0.04103537900077957 - 2.5916996904875994e-19im\n 0.04114919035623714 - 7.9738202040662040e-20im\n\nReferences\n\nAlgorithm 2 in Mele, The infinite Lanczos method for symmetric nonlinear eigenvalue problems, https://arxiv.org/abs/1812.07557, 2018\n\n\n\n\n\n"
},

{
    "location": "methods/#Infinite-Lanczos-based-methods-1",
    "page": "NEP Methods",
    "title": "Infinite Lanczos based methods",
    "category": "section",
    "text": "The Infinite Bi-Lanczos method.infbilanczosThe Infinite Lanczos method, for symmetric NEPsilan"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.nleigs",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.nleigs",
    "category": "function",
    "text": "nleigs(nep::NEP, Σ::AbstractVector{Complex{T}})\n\nFind a few eigenvalues and eigenvectors of a nonlinear eigenvalue problem.\n\nArguments\n\nnep: An instance of a nonlinear eigenvalue problem.\nΣ: A vector containing the points of a polygonal target set in the complex plane.\nΞ: A vector containing a discretization of the singularity set.\ndisplaylevel: Level of display (0, 1, 2).\nmaxdgr: Max degree of approximation.\nminit: Min number of iterations after linearization is converged.\nmaxit: Max number of total iterations.\ntol: Tolerance for residual.\ntollin: Tolerance for convergence of linearization.\nv: Starting vector.\nerrmeasure: Function for error measure (residual norm). Called with arguments (λ,v).\nisfunm : Whether to use matrix functions.\nstatic: Whether to use static version of NLEIGS.\nleja: Use of Leja-Bagby points (0 = no, 1 = only in expansion phase, 2 = always).\nnodes: Prefixed interpolation nodes (only when leja is 0 or 1).\nreusefact: Reuse of matrix factorizations (0 = no, 1 = only after converged linearization, 2 = always).\nblksize: Block size for pre-allocation.\nreturn_details: Whether to return solution details (see NleigsSolutionDetails).\ncheck_error_every: Check for convergence / termination every this number of iterations.\n\nReturn values\n\nλ: Vector of eigenvalues of the nonlinear eigenvalue problem NLEP inside the target set Σ.\nX: Corresponding matrix of eigenvectors.\nres: Corresponding residuals.\ndetails: Solution details, if requested (see NleigsSolutionDetails).\n\nExample\n\njulia> nep=nep_gallery(\"dep0\");\njulia> unit_square = float([1+1im, 1-1im, -1-1im,-1+1im])\njulia> (λ,v)=nleigs(nep,unit_square);\njulia> norm(compute_Mlincomb(nep,λ[1],v[:,1]))\n2.4522684986758914e-12\njulia> norm(compute_Mlincomb(nep,λ[2],v[:,2]))\n2.7572460495529512e-12\n\nReferences\n\nS. Guettel, R. Van Beeumen, K. Meerbergen, and W. Michiels. NLEIGS: A class of fully rational Krylov methods for nonlinear eigenvalue problems. SIAM J. Sci. Comput., 36(6), A2842-A2864, 2014.\nNLEIGS Matlab toolbox\n\n\n\n\n\n"
},

{
    "location": "methods/#NLEIGS-1",
    "page": "NEP Methods",
    "title": "NLEIGS",
    "category": "section",
    "text": "nleigs"
},

{
    "location": "methods/#Class-specific-methods-1",
    "page": "NEP Methods",
    "title": "Class specific methods",
    "category": "section",
    "text": ""
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.companion",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.companion",
    "category": "function",
    "text": "E,A = companion(nep::Pep);\n\nLinearizes a  polynomial eigenvalue problem (PEP) a to the companion form, as in the paper by Mehrmann and Voss. More precisely, for a k-th degree PEP with n-by-n coefficient matrices, this returns matrices E and A, both kn-by-kn, corresponding to the linearized problem\n\nAx = λEx\n\nExample\n\njulia> pep = nep_gallery(\"pep0\");\njulia> E,A = companion(pep);\njulia> λ, V = eigen(A,E);\njulia> minimum(svd(compute_Mder(pep,λ[1])).S)\n2.703104679937224e-12\n\nReferences\n\nV. Mehrmann and H. Voss, Non-linear eigenvalue problems, a challenge for modern eigenvalue methods, GAMM‐Mitteilungen (2004)\n\n\n\n\n\n"
},

{
    "location": "methods/#NonlinearEigenproblems.NEPSolver.polyeig",
    "page": "NEP Methods",
    "title": "NonlinearEigenproblems.NEPSolver.polyeig",
    "category": "function",
    "text": "λ,v = polyeig([eltype],nep::PEP,[eigsolvertype,])\n\nLinearizes a  polynomial eigenvalue problem (PEP) a to the companion form and solves the corresponding linear eigenvalue problem; see companion. The eigsolvertype is optinal can be used to specify how the linear problem is solved; see eig_solve, and EigSolver.\n\nExample\n\njulia> pep = nep_gallery(\"pep0\");\njulia> λ,V = polyeig(pep);\njulia> minimum(svd(compute_Mder(pep,λ[1])).S)\n2.1724582040065456e-14\njulia> norm(compute_Mlincomb(pep,λ[2],vec(V[:,2])))\n1.2210363164200074e-12\n\n\n\n\n\n"
},

{
    "location": "methods/#Companion-linearizations-1",
    "page": "NEP Methods",
    "title": "Companion linearizations",
    "category": "section",
    "text": "companion\npolyeig"
},

{
    "location": "methods/#Rational-?-1",
    "page": "NEP Methods",
    "title": "Rational ?",
    "category": "section",
    "text": ""
},

{
    "location": "types/#",
    "page": "NEP Types",
    "title": "NEP Types",
    "category": "page",
    "text": ""
},

{
    "location": "types/#NEPTypes-1",
    "page": "NEP Types",
    "title": "NEPTypes",
    "category": "section",
    "text": ""
},

{
    "location": "types/#NonlinearEigenproblems.NEPCore.NEP",
    "page": "NEP Types",
    "title": "NonlinearEigenproblems.NEPCore.NEP",
    "category": "type",
    "text": "abstract NEP\n\nA NEP object represents a nonlinear eigenvalue problem. All NEPs should implement\n\nsize(nep::NEP,d)\n\nand at least one of the following\n\nM = compute_Mder(nep::NEP,λ::Number,i::Integer=0)\nV = compute_Mlincomb!(nep::NEP,λ::Number,V::AbstractVecOrMat,a::Vector)\nMM = compute_MM(nep::NEP,S,V)\n\n\n\n\n\n"
},

{
    "location": "types/#The-basic-type-1",
    "page": "NEP Types",
    "title": "The basic type",
    "category": "section",
    "text": "The basic class is the abstract class NEP which represents a NEP. All other defined NEPs should inherit from NEP, or from a more specialized version; see, e.g., ProjectableNEP or AbstractSPMF.NEPBelow we list the most common types built-in to NEP-PACK, and further down how you can access the NEP. However, the structure is made for extendability, and hence it is possible for you to extend with your own class of NEPs."
},

{
    "location": "types/#NonlinearEigenproblems.NEPTypes.SPMF_NEP-Tuple{Array{#s12,1} where #s12<:(AbstractArray{T,2} where T),Array{#s13,1} where #s13<:Function}",
    "page": "NEP Types",
    "title": "NonlinearEigenproblems.NEPTypes.SPMF_NEP",
    "category": "method",
    "text": " SPMF_NEP(AA, fii, check_consistency, Schur_fact = false, align_sparsity_patterns = false, , Ftype)\n\nCreates a SPMF_NEP consisting of matrices AA and functions fii. The SPMF_NEP is defined by a sum of products of matrices and functions\n\nM(λ)=_i A_i f_i(λ)\n\nAll of the matrices A_0 are of size nn and f_i are a functions. The  functions f_i must be defined for matrices in the standard matrix function sense.\n\nParameters\n\nAA is a Vector of matrices. The matrices have to be of the same type. If you need a NEP with different types you can use SumNEP to construct a sum of two SPMF_NEP.\nfii is a Vector of functions. Each function takes one parameter S. The functions must be available both as a scalar valid function and a matrix function. If S is a square matrix, fii[k](S) musst also be a square matrix. If S is a scalar fii[k](S) is a scalar.\ncheck_consistency (default true) determines if we should initiate by running tests to verify that the fii satisfies the conditions that every function is valid both for matrices and scalars. This is done by using @code_typed and the functions need to be type-stable in that sense.\nalign_sparsity_patterns (default false) has effect only for sparse matrices (SparseMatrixCSC). If align_sparsity_patterns=true the SparseMatrixCSC matrices will be replaced by equivalent SparseMatrixCSC matrices where the colptr and rowval are identical. This increases the speed of some functions, e.g., compute_Mder. If align_sparsity_patterns=true the matrices in the NEP should be considered read only. If the sparsity patterns are completely or mostly distinct, it may be more efficient to set this flag to false.\nFtype (default ComplexF64) determines an underlying type of the functions. The output of any function should be \"smaller\" than the promoted type of the input and Ftype. More precisely, if F=fii[k], then the type logic is as follows eltype(F(λ))=promote_type(eltype(λ),Ftype).\nSchur_fact (default false) determines if the compute_MM function should tridiagonalize the matrix before carrying out the computation. This can be faster for large matrices.\n\nExample\n\njulia> A0=[1 3; 4 5]; A1=[3 4; 5 6];\njulia> id_op=S -> one(S) # Note: We use one(S) to be valid both for matrices and scalars\njulia> exp_op=S -> exp(S)\njulia> nep=SPMF_NEP([A0,A1],[id_op,exp_op]);\njulia> compute_Mder(nep,1)-(A0+A1*exp(1))\n2×2 Array{Float64,2}:\n 0.0  0.0\n 0.0  0.0\n\n\n\n\n\n"
},

{
    "location": "types/#SPMF-1",
    "page": "NEP Types",
    "title": "SPMF",
    "category": "section",
    "text": "One of the most common problem types is the SPMF_NEP. SPMF is short for Sum of Products of Matrices and Functions and the NEP is described byM(λ) = sum_i A_i f_i(λ)The constructor of the SPMF_NEP, takes the the matrices and the functions, but also a number of other (optional) parameters which may increase performance or preserve underlying types.SPMF_NEP(AA::Vector{<:AbstractMatrix}, fii::Vector{<:Function};\n                  Schur_fact = false,\n                  check_consistency=false,\n                  align_sparsity_patterns=false)"
},

{
    "location": "types/#NonlinearEigenproblems.NEPTypes.AbstractSPMF",
    "page": "NEP Types",
    "title": "NonlinearEigenproblems.NEPTypes.AbstractSPMF",
    "category": "type",
    "text": "abstract  AbstractSPMF <: ProjectableNEP\n\nAn AbstractSPMF is an abstract class representing NEPs which can be represented as a Sum of products of matrices and functions M(λ)=Σ_i A_i f_i(λ), where i = 0,1,2,..., all of the matrices are of size n times n and f_i are functions.\n\nAny AbstractSPMF has to have implementations of get_Av() and get_fv() which return the functions and matrices.\n\n\n\n\n\n"
},

{
    "location": "types/#NonlinearEigenproblems.NEPTypes.get_Av",
    "page": "NEP Types",
    "title": "NonlinearEigenproblems.NEPTypes.get_Av",
    "category": "function",
    "text": "get_Av(nep::AbstractSPMF)\n\nReturns an array of matrices A_i in the AbstractSPMF: M(λ)=Σ_i A_i f_i(λ)\n\n\n\n\n\n"
},

{
    "location": "types/#NonlinearEigenproblems.NEPTypes.get_fv",
    "page": "NEP Types",
    "title": "NonlinearEigenproblems.NEPTypes.get_fv",
    "category": "function",
    "text": "get_Av(nep::AbstractSPMF)\n\nReturns an Array of functions (that can be evaluated both as scalar and matrix functions) f_i in the AbstractSPMF: M(λ)=Σ_i A_i f_i(λ)\n\n\n\n\n\n"
},

{
    "location": "types/#Abstract-SPMFs-1",
    "page": "NEP Types",
    "title": "Abstract SPMFs",
    "category": "section",
    "text": "Many problems can be described in the class of SPMF. There might be more specialized and efficient implementations such as, e.g. PEP, DEP or REP. However, on an abstract level it may still be important to recognize the similarities. Hence there is an abstract class AbstractSPMF, which in itself inherits from ProjectableNEP.AbstractSPMF\nget_Av\nget_fv"
},

{
    "location": "types/#NonlinearEigenproblems.NEPTypes.PEP",
    "page": "NEP Types",
    "title": "NonlinearEigenproblems.NEPTypes.PEP",
    "category": "type",
    "text": "struct PEP <: AbstractSPMF\n\nA polynomial eigenvalue problem (PEP) is defined by the sum the sum Σ_i A_i λ^i, where i = 0,1,2,..., and  all of the matrices are of size n times n.\n\n\n\n\n\n"
},

{
    "location": "types/#NonlinearEigenproblems.NEPTypes.PEP-Tuple{Array}",
    "page": "NEP Types",
    "title": "NonlinearEigenproblems.NEPTypes.PEP",
    "category": "method",
    "text": "PEP(AA::Array)\n\nCreates a polynomial eigenvalue problem with monomial matrices specified in AA, which is an array of matrices.\n\njulia> A0=[1 3; 4 5]; A1=A0.+one(2); A2=ones(2,2);\njulia> pep=PEP([A0,A1,A2])\njulia> compute_Mder(pep,3)-(A0+A1*3+A2*9)\n2×2 Array{Float64,2}:\n 0.0  0.0\n 0.0  0.0\n\n\n\n\n\n"
},

{
    "location": "types/#PEP-1",
    "page": "NEP Types",
    "title": "PEP",
    "category": "section",
    "text": "The Polynomial Eigenvalue Problem is described byM(λ) = sum_i A_i λ^iPEPIn order to construct a PEP, we only need to provide the matrices.PEP(AA::Array)"
},

{
    "location": "types/#NonlinearEigenproblems.NEPTypes.DEP",
    "page": "NEP Types",
    "title": "NonlinearEigenproblems.NEPTypes.DEP",
    "category": "type",
    "text": "type DEP <: AbstractSPMF\n\nA DEP (Delay Eigenvalue problem) is defined by the sum  -λI + Σ_i A_i exp(-tau_i λ) where all of the matrices are of size n times n.\nConstructor: DEP(AA,tauv) where AA is an array of the matrices A_i, and tauv is a vector of the values  tau_i.\n\nExample:\n\njulia> A0=randn(3,3); A1=randn(3,3);\njulia> tauv=[0,0.2] # Vector with delays\njulia> dep=DEP([A0,A1],tauv)\njulia> λ=3.0;\njulia> M1=compute_Mder(dep,λ)\njulia> M2=-λ*I+A0+A1*exp(-tauv[2]*λ)\njulia> norm(M1-M2)\n0.0\n\n\n\n\n\n"
},

{
    "location": "types/#DEP-1",
    "page": "NEP Types",
    "title": "DEP",
    "category": "section",
    "text": "The Delay Eigenvalue Problem is described byM(λ) = -λI + sum_i A_i e^-τ_i λDEP"
},

{
    "location": "types/#NonlinearEigenproblems.NEPTypes.REP",
    "page": "NEP Types",
    "title": "NonlinearEigenproblems.NEPTypes.REP",
    "category": "type",
    "text": "struct REP <: AbstractSPMF\n\nA REP represents a rational eigenvalue problem. The REP is defined by the sum Σ_i A_i s_i(λ)q_i(λ), where i = 0,1,2,..., all of the matrices are of size n times n and si and qi are polynomials.\n\n\n\n\n\n"
},

{
    "location": "types/#NonlinearEigenproblems.NEPTypes.REP-Tuple{Any,Array{#s13,1} where #s13<:Number}",
    "page": "NEP Types",
    "title": "NonlinearEigenproblems.NEPTypes.REP",
    "category": "method",
    "text": "REP(A,poles)\n\nCreates a rational eigenvalue problem. The constructor takes the matrices A_i and a sequence of poles as input (not complete).\n\nExample\n\njulia> A0=[1 2; 3 4]; A1=[3 4; 5 6];\njulia> nep=REP([A0,A1],[1,3]);\njulia> compute_Mder(nep,3)\n2×2 Array{Float64,2}:\n NaN  NaN\n NaN  NaN\n\n\n\n\n\n"
},

{
    "location": "types/#REP-1",
    "page": "NEP Types",
    "title": "REP",
    "category": "section",
    "text": "The Rational Eigenvalue Problem is described by:REPThe constructor is called as:REP(AA,poles::Array{<:Number,1})"
},

{
    "location": "types/#NonlinearEigenproblems.NEPTypes.SumNEP",
    "page": "NEP Types",
    "title": "NonlinearEigenproblems.NEPTypes.SumNEP",
    "category": "function",
    "text": "SumNEP{nep1::NEP,nep2::NEP}\nSumNEP{nep1::AbstractSPMF,nep2::AbstractSPMF}\n\nSumNEP is a function creating an object that corresponds to a sum of two NEPs, i.e., if nep is created by SumNEP it is defined by\n\nM(λ)=M_1(λ)+M_2(λ)\n\nwhere M1 and M2 are defined by nep1 and nep2.\n\nExample:\n\njulia> nep1=DEP([ones(3,3),randn(3,3)])\njulia> nep2=PEP([ones(3,3),randn(3,3),randn(3,3)])\njulia> sumnep=SumNEP(nep1,nep2);\njulia> s=3.0;\njulia> M=compute_Mder(sumnep,s);\n3×3 Array{Float64,2}:\n  8.54014     6.71897   7.12007\n -0.943908  -13.0795   -0.621659\n  6.03155    -7.26726  -6.42828\njulia> M1=compute_Mder(nep1,s);\njulia> M2=compute_Mder(nep2,s);\njulia> M1+M2  # Same as M\n3×3 Array{Float64,2}:\n  8.54014     6.71897   7.12007\n -0.943908  -13.0795   -0.621659\n  6.03155    -7.26726  -6.42828\n\nSee also: SPMFSumNEP, GenericSumNEP\n\n\n\n\n\n"
},

{
    "location": "types/#NonlinearEigenproblems.NEPTypes.GenericSumNEP",
    "page": "NEP Types",
    "title": "NonlinearEigenproblems.NEPTypes.GenericSumNEP",
    "category": "type",
    "text": "struct GenericSumNEP{NEP1<:NEP,NEP2<:NEP}  <: NEP\n\nSee also: SumNEP, SPMFSumNEP\n\n\n\n\n\n"
},

{
    "location": "types/#NonlinearEigenproblems.NEPTypes.SPMFSumNEP",
    "page": "NEP Types",
    "title": "NonlinearEigenproblems.NEPTypes.SPMFSumNEP",
    "category": "type",
    "text": "struct SPMFSumNEP{NEP1<:AbstractSPMF,NEP2<:AbstractSPMF}  <: AbstractSPMF{AbstractMatrix}\n\nSee also: SumNEP, GenericSumNEP\n\n\n\n\n\n"
},

{
    "location": "types/#SumNEP-1",
    "page": "NEP Types",
    "title": "SumNEP",
    "category": "section",
    "text": "It is also possible to consider NEPs that are summs of other NEPs. For such situations there are SumNEPs. Specifically GenericSumNEP and SPMFSumNEP. Both are constructed using the function SumNEP.SumNEPGenericSumNEPSPMFSumNEP"
},

{
    "location": "types/#NonlinearEigenproblems.NEPCore.compute_Mder",
    "page": "NEP Types",
    "title": "NonlinearEigenproblems.NEPCore.compute_Mder",
    "category": "function",
    "text": "compute_Mder(nep::NEP,λ::Number [,i::Integer=0])\n\nComputes the ith derivative of nep evaluated in λ.\n\nExample\n\nThis example shows that compute_Mder(nep,λ,1) gives the first derivative.\n\njulia> nep=nep_gallery(\"dep0\");\njulia> ϵ=1e-5;\njulia> Aminus=compute_Mder(nep,λ-ϵ);\njulia> Aminus=compute_Mder(nep,λ-ϵ);\njulia> Aplus=compute_Mder(nep,λ+ϵ);\njulia> opnorm((Aplus-Aminus)/(2ϵ)-compute_Mder(nep,λ,1))\n1.990970375089371e-11\n\n\n\n\n\n"
},

{
    "location": "types/#NonlinearEigenproblems.NEPCore.compute_Mlincomb!",
    "page": "NEP Types",
    "title": "NonlinearEigenproblems.NEPCore.compute_Mlincomb!",
    "category": "function",
    "text": "compute_Mlincomb(nep::NEP,λ::Number,V, a::Vector=ones(size(V,2)), startder=0)\ncompute_Mlincomb!(nep::NEP,λ::Number,V, a::Vector=ones(size(V,2)), startder=0)\n\nComputes the linear combination of derivatives\nΣ_i a_i M^(i)(λ) v_i starting from derivative startder. The function compute_Mlincomb! does the same but may modify the V matrix/array.\n\nExample\n\nThis example shows that compute_Mder gives a result consistent with compute_Mlincomb. Note that compute_Mlincomb is in general faster since no matrix needs to be constructed.\n\njulia> nep=nep_gallery(\"dep0\");\njulia> v=ones(size(nep,1)); λ=-1+1im;\njulia> norm(compute_Mder(nep,λ,1)*v-compute_Mlincomb(nep,λ,hcat(v,v),[0,1]))\n1.0778315928076987e-15\n\n\n\n\n\n\n"
},

{
    "location": "types/#NonlinearEigenproblems.NEPCore.compute_MM",
    "page": "NEP Types",
    "title": "NonlinearEigenproblems.NEPCore.compute_MM",
    "category": "function",
    "text": "compute_MM(nep::NEP,S,V)\n\nComputes the sum Σ_i M_i V f_i(S) for a NEP, where S and V are matrices, and the NEP satisfies M(λ)=Σ_i M_i f_i(λ).\n\nExample\n\nThis example shows that for diagonal S, the result of compute_MM can also be computed with compute_Mlincomb\n\njulia> nep=nep_gallery(\"dep0\");\njulia> D=diagm(0 => [1,2])\n2×2 Array{Int64,2}:\n 1  0\n 0  2\njulia> V=ones(size(n,1),2);\njulia> W=compute_MM(nep,D,V);\njulia> norm(W[:,1]-compute_Mlincomb(nep,D[1,1],V[:,1]))\n1.1102230246251565e-16\njulia> norm(W[:,2]-compute_Mlincomb(nep,D[2,2],V[:,2]))\n0.0\n\nReference\n\nProperties of the quantity Σ_i M_i V f_i(S) for non-polynomial nonlinear eigenvalue problems were extensively used in:\n\nD. Kressner A block Newton method for nonlinear eigenvalue problems, Numer. Math., 114 (2) (2009), pp. 355-372\nC. Effenberger, Robust solution methods for nonlinear eigenvalue problems, PhD thesis, 2013, EPF Lausanne\n\n\n\n\n\n"
},

{
    "location": "types/#Accessing-the-NEP-1",
    "page": "NEP Types",
    "title": "Accessing the NEP",
    "category": "section",
    "text": "The nonlinear eigenvalue problem is defined by the data stored in the NEP-class, and the NEP-solvers access the data mainly through three main functions, compute_Mder compute_Mlincomb and compute_MM.compute_Mdercompute_Mlincomb!compute_MM"
},

{
    "location": "linsolvers/#",
    "page": "LinSolver",
    "title": "LinSolver",
    "category": "page",
    "text": ""
},

{
    "location": "linsolvers/#NonlinearEigenproblems.LinSolvers.LinSolver",
    "page": "LinSolver",
    "title": "NonlinearEigenproblems.LinSolvers.LinSolver",
    "category": "type",
    "text": "abstract type LinSolver\n\nStructs inheriting from this type are able to solve linear systems associated with a NEP, for a specific λ-value. The most common are direct solvers such as DefaultLinSolver, BackslashLinSolver and iterative solvers such as GMRESLinSolver.\n\nThe LinSolver objects are usually created by the NEP-algorithms through creator functions, which are passed as parameters.\n\nExample\n\nThe most common usecase is that you want to pass a linsolvercreator-function as parameter to the NEP-algorithm. This example shows how you can solvers based on backslash or factorize(). In the example, BackslashLinSolver does not exploit that the system matrix remains the same throughout the algorithm and is therefore slower.\n\njulia> nep=nep_gallery(\"qdep0\");\njulia> using BenchmarkTools\njulia> v0=ones(size(nep,1));\njulia> @btime λ,v=quasinewton(nep,λ=-1,v=v0, linsolvercreator=default_linsolvercreator);\n  199.540 ms (4929 allocations: 59.83 MiB)\njulia> @btime λ,v=quasinewton(nep,λ=-1,v=v0, linsolvercreator=backslash_linsolvercreator);\n  1.632 s (6137 allocations: 702.85 MiB)\n\nExample\n\nThe LinSolvers are constructed for extendability. This example creates our own LinSolver which uses an explicit formula for the inverse if the NEP has dimension 2x2.\n\nCreate the types and a creator.\n\njulia> using LinearAlgebra\njulia> struct MyLinSolver <: LinSolver\n   M::Matrix{ComplexF64}\nend\njulia> function my_linsolvercreator(nep,λ)\n   M=compute_Mder(nep,λ);\n   return MyLinSolver(M);\nend\n\nExplicit import lin_solve to show how to solve a linear system.\n\njulia> import NonlinearEigenproblems.LinSolvers.lin_solve;\njulia> function lin_solve(solver::MyLinSolver,b::AbstractVecOrMat;tol=0)\n   M=solver.M;\n   invM=(1/(det(M)))*[M[2,2] -M[1,2];-M[2,1] M[1,1]]\n   return invM*b\nend\njulia> nep=SPMF_NEP([[1.0 3.0; 4.0 5.0], [2.0 1.0; -1 2.0]], [S->S^2,S->exp(S)])\njulia> λ,v=quasinewton(nep,λ=-1,v=[1;1],linsolvercreator=my_linsolvercreator);\n\nSee also: lin_solve, DefaultLinSolver, default_linsolvercreator, BackslashLinSolver, backslash_linsolvercreator, GMRESLinSolver, gmres_linsolvercreator\n\n\n\n\n\n"
},

{
    "location": "linsolvers/#NonlinearEigenproblems.LinSolvers.lin_solve",
    "page": "LinSolver",
    "title": "NonlinearEigenproblems.LinSolvers.lin_solve",
    "category": "function",
    "text": "lin_solve(solver::LinSolver, b::AbstractVecOrMat; tol=0)\n\nThis function solves the linear system represented in solver::LinSolver with a right-hand side b. The tol kwarg is controlling how accurate the linear system needs to be solved. A NEP-algorithm will call this solver every time a linear system associated with M(λ) needs to be solved.\n\nThis function must be overloaded if a user wants to define their own way of solving linear systems. See LinSolver for examples.\n\n\n\n\n\n"
},

{
    "location": "linsolvers/#NonlinearEigenproblems.LinSolvers.DefaultLinSolver",
    "page": "LinSolver",
    "title": "NonlinearEigenproblems.LinSolvers.DefaultLinSolver",
    "category": "type",
    "text": "struct DefaultLinSolver <: LinSolver\n\nThis represents the linear solver associated with julia factorize(). See LinSolver and default_linsolvercreator for examples.\n\n\n\n\n\n"
},

{
    "location": "linsolvers/#NonlinearEigenproblems.LinSolvers.default_linsolvercreator",
    "page": "LinSolver",
    "title": "NonlinearEigenproblems.LinSolvers.default_linsolvercreator",
    "category": "function",
    "text": "default_linsolvercreator(nep::NEP, λ; umfpack_refinements = 2)\n\nCreate a linear solver of type DefaultLinSolver for the NEP evaluated in point λ. For sparse matrices (the underlying solver is usually UMFPACK) the maximum number of iterative refinements can be changed to trade accuracy for performance with the parameter umfpack_refinements. UMFPACK defaults to a maximum of 2 iterative refinements.\n\nFor examples see LinSolver.\n\nSee also: DefaultLinSolver.\n\n\n\n\n\n"
},

{
    "location": "linsolvers/#NonlinearEigenproblems.LinSolvers.BackslashLinSolver",
    "page": "LinSolver",
    "title": "NonlinearEigenproblems.LinSolvers.BackslashLinSolver",
    "category": "type",
    "text": "struct BackslashLinSolver <: LinSolver\n\nThis represents a linear solver corresponding to the backslash operator (no pre-factorization).\n\nSee also: LinSolver and backslash_linsolvercreator\n\n\n\n\n\n"
},

{
    "location": "linsolvers/#NonlinearEigenproblems.LinSolvers.backslash_linsolvercreator",
    "page": "LinSolver",
    "title": "NonlinearEigenproblems.LinSolvers.backslash_linsolvercreator",
    "category": "function",
    "text": "backslash_linsolvercreator(nep::NEP, λ)\n\nCreate a linear solver of type BackslashLinSolver evaluated in λ.\n\nSee also: LinSolver, BackslashLinSolver\n\n\n\n\n\n"
},

{
    "location": "linsolvers/#NonlinearEigenproblems.LinSolvers.GMRESLinSolver",
    "page": "LinSolver",
    "title": "NonlinearEigenproblems.LinSolvers.GMRESLinSolver",
    "category": "type",
    "text": "struct GMRESLinSolver <: LinSolver\n\nThis represents a solver done with the julia GMRES implementation.\n\nSee also: LinSolver, gmres_linsolvercreator\n\n\n\n\n\n"
},

{
    "location": "linsolvers/#NonlinearEigenproblems.LinSolvers.gmres_linsolvercreator",
    "page": "LinSolver",
    "title": "NonlinearEigenproblems.LinSolvers.gmres_linsolvercreator",
    "category": "function",
    "text": "gmres_linsolvercreator(nep::NEP, λ, kwargs=())\n\nCreate a linear solver of type GMRESLinSolver. The kwargs are passed as parameter to Julia-built-in-GMRES.\n\nSee also: LinSolver, GMRESLinSolver\n\n\n\n\n\n"
},

{
    "location": "linsolvers/#LinSolvers-1",
    "page": "LinSolver",
    "title": "LinSolvers",
    "category": "section",
    "text": "Most NEP-algorithms need to solve the linear system associated with M(λ). We provide an interface to specify which solver to use or define your own solver.LinSolverlin_solveDefaultLinSolverdefault_linsolvercreatorBackslashLinSolverbackslash_linsolvercreatorGMRESLinSolvergmres_linsolvercreator"
},

{
    "location": "linsolvers/#NonlinearEigenproblems.LinSolvers.EigSolver",
    "page": "LinSolver",
    "title": "NonlinearEigenproblems.LinSolvers.EigSolver",
    "category": "type",
    "text": "abstract type EigSolver\n\nStructs inheriting from this type are able to solve linear eigenvalue problems arising in certain methods, such as, e.g., mslp, sgiter, and polyeig.\n\nThe EigSolver objects are passed as types to the NEP-algorithms, which uses it to dispatch the correct version of the function eig_solve.\n\nExample\n\nThe most common usecase is that you do not want to specify anything in particular, since the DefaultEigSolver will use a dense or a sparse method depending on you problem. However, this example shows how you can force mslp to use the sparse solver.\n\njulia> nep=nep_gallery(\"qdep0\");\njulia> λ,v = mslp(nep, eigsolvertype=NativeEigSSolver);\njulia> norm(compute_Mlincomb(nep,λ,v))\n1.0324139764567768e-15\n\nExample\n\nThe EigSolvers are constructed for extendability. As an illustartion this example creates a naive EigSolver which casts the problem to a standard linear eigenproblem and calls the built-in function to solve it.\n\nCreate the types and a creator.\n\njulia> struct MyEigSolver <: EigSolver\n   A\n   E\n   function MyEigSolver(A,E)\n      return new(A,E)\n   end\nend\n\njulia> import NonlinearEigenproblems.LinSolvers.eig_solve;\njulia> function eig_solve(solver::MyEigSolver;nev = 1, target = 0)\n   M = solver.E \\ solver.A\n   eig = eigen(M)\n   i = argmin(abs.(eig.values))\n   return eig.values[i], eig.vectors[:,i]\nend\njulia> nep=nep_gallery(\"dep0\", 50);\njulia> λ,v = mslp(nep, eigsolvertype=MyEigSolver, tol=1e-5);\njulia> norm(compute_Mlincomb(nep,λ,v))\n3.0777795031319117e-10\n\nSee also: eig_solve, DefaultEigSolver, NativeEigSolver, NativeEigSSolver, eig_solve\n\n\n\n\n\n"
},

{
    "location": "linsolvers/#NonlinearEigenproblems.LinSolvers.eig_solve",
    "page": "LinSolver",
    "title": "NonlinearEigenproblems.LinSolvers.eig_solve",
    "category": "function",
    "text": "eig_solve(solver::EigSolver; [nev,] [target,])\n\nThis function solves the linear eigenvalue problem represented in solver::EigSolver. The nev kwarg is controlling the number of eigenvalues aimed for, and target specifies around which point the eigenvalues are computed. The former has a defalut value equalt to the seize of the problem, and the latter has a defalut value 0.\n\nReturn values are of the form (Vector, Matrix) where the former contains the eigenvalues and the latter the eigenvectors.\n\nThis function must be overloaded if a user wants to define their own way of solving linear eigenvalue problems. See EigSolver for examples.\n\n\n\n\n\n"
},

{
    "location": "linsolvers/#NonlinearEigenproblems.LinSolvers.DefaultEigSolver",
    "page": "LinSolver",
    "title": "NonlinearEigenproblems.LinSolvers.DefaultEigSolver",
    "category": "type",
    "text": "struct DefaultEigSolver <: EigSolver\n\nA linear eigenvalueproblem solver that calls checks for sparsity and accordingly assigns an appropriate solver.\n\nSee also: EigSolver, eig_solve, NativeEigSolver, NativeEigSSolver\n\n\n\n\n\n"
},

{
    "location": "linsolvers/#NonlinearEigenproblems.LinSolvers.NativeEigSolver",
    "page": "LinSolver",
    "title": "NonlinearEigenproblems.LinSolvers.NativeEigSolver",
    "category": "type",
    "text": "struct NativeEigSolver <: EigSolver\n\nA linear eigenvalueproblem solver that calls Julia\'s in-built eigen()\n\nConstructed as NativeEigSolver(A, [B,]), and solves the problem\n\nAx = λBx\n\nThe paramter B is optional an default is indentity, for which a standard linear eigenproblem is solved.\n\nSee also: EigSolver and eig_solve\n\n\n\n\n\n"
},

{
    "location": "linsolvers/#NonlinearEigenproblems.LinSolvers.NativeEigSSolver",
    "page": "LinSolver",
    "title": "NonlinearEigenproblems.LinSolvers.NativeEigSSolver",
    "category": "type",
    "text": "struct NativeEigSSolver <: EigSolver\n\nA linear eigenvalueproblem solver for large and sparse problems that calls Julia\'s in-built eigs()\n\nConstructed as NativeEigSSolver(A, [B,]), and solves the problem\n\nAx = λBx\n\nThe paramter B is optional an default is indentity, for which a standard linear eigenproblem is solved.\n\nSee also: EigSolver and eig_solve\n\n\n\n\n\n"
},

{
    "location": "linsolvers/#EigSolvers-1",
    "page": "LinSolver",
    "title": "EigSolvers",
    "category": "section",
    "text": "Some NEP-algorithms need to solve an associated linear eigenvalue problem. associated with M(λ). You will likely only need the native eigensolvers in Julia. Nevertheless, we provide an interface to specify which solver to use or define your own solver.EigSolvereig_solveDefaultEigSolverNativeEigSolverNativeEigSSolver"
},

{
    "location": "errmeasure/#",
    "page": "Error measure",
    "title": "Error measure",
    "category": "page",
    "text": ""
},

{
    "location": "errmeasure/#Measuring-the-error-1",
    "page": "Error measure",
    "title": "Measuring the error",
    "category": "section",
    "text": "This only works on NEP-PACK version 0.2.6 and onwardsAll iterative algorithms need some form of termination criteria. In NEP-PACK, all NEP-solvers provide the possibility to specify the desired tolerance, as well as how the error is measured or estimated. The tolerance is specified in the kwarg  tol (which is a real number) and the way to measure the error is given in errmeasure."
},

{
    "location": "errmeasure/#Standard-usage-1",
    "page": "Error measure",
    "title": "Standard usage",
    "category": "section",
    "text": "NEP-PACK comes with several ways to measure errors for many NEP-types.errmeasure=ResidualErrmeasure: The error is estimated by the use of the residual norm:mathrmerr=fracM(λ)vverrmeasure=BackwardErrmeasure: The error is estimated by using the backward error bounds. This error measure will not work for all NEPs. An implementation is provided for any AbstractSPMF. If your NEP is an AbstractSPMF with terms:\nM(λ)=A_1f_1(λ)+cdots+A_mf_m(λ)\nthe error will be estimated by\nmathrmerr=fracM(λ)vvfrac1A_1_Ff_1(λ)+cdots+A_m_Ff_m(λ)\nIn other words, the BackwardErrmeasure is a weighting of the ResidualErrmeasure.\nerrmeasure=DefaultErrmeasure: When this errmeasure is specified, NEP-PACK tries to determine a error measure for you. In general, BackwardErrmeasure will be preferred if possible. This behavior may change in future versions of NEP-PACK.Example: Most NEP-solvers take the errmeasure as an kwarg.julia> nep=nep_gallery(\"qdep0\");\njulia> # Solve the problem to residual norm 1e-8\njulia> (λ,v)=mslp(nep,errmeasure=ResidualErrmeasure,tol=1e-8)\njulia> norm(compute_Mlincomb(nep,λ,v))/norm(v) # It\'s smaller than tol?\n3.503700819937386e-9\njulia> nep isa AbstractSPMF # Is it an AbstractSPMF so we can use BackwardErrmeasure?\ntrue\njulia> (λ,v)=mslp(nep,errmeasure=BackwardErrmeasure,tol=1e-10)\njulia> factor=abs(fv[1](λ))*norm(Av[1])+\n     abs(fv[2](λ))*norm(Av[2])+abs(fv[3](λ))*norm(Av[3]);\njulia> norm(compute_Mlincomb(nep,λ,v))/(norm(v)*factor)\n1.659169482386331e-11"
},

{
    "location": "errmeasure/#User-defined-error-measure-1",
    "page": "Error measure",
    "title": "User defined error measure",
    "category": "section",
    "text": "There are two ways that a user can specify how to measure the error."
},

{
    "location": "errmeasure/#User-defined-error-1:-Function-handle-1",
    "page": "Error measure",
    "title": "User defined error 1: Function handle",
    "category": "section",
    "text": "The user can provide a function handle which is called to obtain the error. The errmeasure can be a function, which takes two parameters as input (λ,v) and returns the error (or estimate thereof).The most common situation is that you want to report the error (as a function of iteration) with a reference solutions.  If we want to get a very accurate approximation of the true error, we can run the  algorithm twice, and the second time we run the algorithm we use the result of the first run as a reference. julia> nep=nep_gallery(\"qdep0\");\njulia> v0=ones(size(nep,1));\njulia> (λref,v)=resinv(nep,v=v0,λ=230^2+1im,displaylevel=1);\njulia> myerrmeasure = (λ,v) -> abs(λ-λref)/abs(λ);\njulia> (λ,v)=resinv(nep,v=v0,λ=250^2+1im,displaylevel=1,tol=1e-10,errmeasure=myerrmeasure);\nIteration:  1 errmeasure:1.274091618457501296e-01 \nIteration:  2 errmeasure:9.535794095609478882e-01 \n...\nIteration: 49 errmeasure:1.269396691930517923e-10 \nIteration: 50 errmeasure:7.608430406801784718e-11 "
},

{
    "location": "errmeasure/#User-defined-error-2:-A-user-defined-type-1",
    "page": "Error measure",
    "title": "User defined error 2: A user defined type",
    "category": "section",
    "text": "Due to the multiple dispatch and handling of types in Julia, code can be faster when if use types instead of function handles. It is  possible to provide carry out the same simulation as above with a user defined type. You first need to define a new typejulia> struct RefErrmeasure <: Errmeasure; nep::NEP; endThe error measure should then provided in the function  estimate_error:julia> v0=ones(size(nep,1));\njulia> (λref,v)=resinv(nep,v=v0,λ=230^2+1im,displaylevel=1);\njulia> function NonlinearEigenproblems.estimate_error(e::RefErrmeasure,λ,v)\n         return abs(λ-λref)/abs(λ);\n       end\njulia> (λ,v)=resinv(nep,v=v0,λ=250^2+1im,displaylevel=1,tol=1e-10,errmeasure=RefErrmeasure);\nIteration:  1 errmeasure:1.274091618457501296e-01 \n...\nIteration: 49 errmeasure:1.269396691930517923e-10 \nIteration: 50 errmeasure:7.608430406801784718e-11 "
},

{
    "location": "errmeasure/#As-a-NEP-solver-developer-1",
    "page": "Error measure",
    "title": "As a NEP-solver developer",
    "category": "section",
    "text": "NEP-solvers should use the Errmeasure as follows. The NEP-solver should take as input a ErrmeasureType. This corresponds to either a function or a type, but if you follow the procedure below, you will not have to worry about that.function mysolver(nep::NEP;errmeasure::ErrmeasureType=DefaultErrmeasure)Before the main iteration, you need to initialize the error measure computation. The precomptued data  is stored in a variable typically called ermdata:    ermdata=init_errmeasure(errmeasure,nep);In the main for loop you want to call the estimate_error function:for k=1:maxit\n    err=estimate_error(ermdata,λ,v)\n    if (err < 1e-10)\n       return (λ,v)\n    end \n    ....\n\nend "
},

{
    "location": "errmeasure/#Methods-and-types-1",
    "page": "Error measure",
    "title": "Methods and types",
    "category": "section",
    "text": "NonlinearEigenproblems.NEPTypes.ErrmeasureNonlinearEigenproblems.NEPTypes.estimate_errorNonlinearEigenproblems.NEPTypes.init_errmeasure"
},

{
    "location": "transformations/#",
    "page": "NEP Transformations",
    "title": "NEP Transformations",
    "category": "page",
    "text": ""
},

{
    "location": "transformations/#NonlinearEigenproblems.NEPTypes.shift_and_scale",
    "page": "NEP Transformations",
    "title": "NonlinearEigenproblems.NEPTypes.shift_and_scale",
    "category": "function",
    "text": "shift_and_scale(orgnep::NEP;shift=0,scale=1)\n\nTransforms the orgnep by defining a new NEP from the relation T(λ)=M(scale * λ+shift) where M is the orgnep. This function tries  to preserve the NEP type, e.g., a shiftandscale operation on an SPMF-object, return an SPMF object. If it cannot preserve the type, it will return a nep of the struct ShiftScaledNEP.\n\nExample\n\njulia> nep0=nep_gallery(\"pep0\")\njulia> σ=3; α=10;\njulia> nep1=shift_and_scale(nep0,shift=σ,scale=α)\njulia> opnorm(compute_Mder(nep0,α*(4+4im)+σ)-compute_Mder(nep1,4+4im))\n8.875435870738592e-12\n\n\n\n\n\n"
},

{
    "location": "transformations/#Transforming-NEPs-1",
    "page": "NEP Transformations",
    "title": "Transforming NEPs",
    "category": "section",
    "text": "There are various ways to transform NEPs into other NEPs. The simplest example is the function shift_and_scale().shift_and_scaleSimilarly mobius_transform() is more general than shift_and_scale which transform the problem using a Möbius transformation. The function taylor_exp create new PEP by doing truncating a Taylor expansion."
},

{
    "location": "transformations/#Projection-1",
    "page": "NEP Transformations",
    "title": "Projection",
    "category": "section",
    "text": "Several methods for NEPs are based on forming a smaller NEP, which we will refer to as a projection:N(λ)=W^HM(λ)Vwhere VWinmathbbC^ntimes p and the corresponding projected problemN(λ)u=0"
},

{
    "location": "transformations/#NonlinearEigenproblems.NEPTypes.ProjectableNEP",
    "page": "NEP Transformations",
    "title": "NonlinearEigenproblems.NEPTypes.ProjectableNEP",
    "category": "type",
    "text": "abstract ProjectableNEP <: NEP\n\nA ProjectableNEP is a NEP which can be projected, i.e., one can construct the problem W*M(λ)Vw=0 with the Proj_NEP. A NEP which is of this must have the function create_proj_NEP(orgnep::ProjectableNEP) implemented. This function must return a Proj_NEP.\n\nSee also: set_projectmatrices!.\n\nExample:\n\njulia> nep=nep_gallery(\"dep0\");\njulia> typeof(nep)\nDEP{Float64,Array{Float64,2}}\njulia> isa(nep,ProjectableNEP)\ntrue\njulia> projnep=create_proj_NEP(nep);\njulia> e1 = Matrix(1.0*I,size(nep,1),1);\njulia> set_projectmatrices!(projnep,e1,e1);\njulia> compute_Mder(nep,3.0)[1,1]\n-2.315345215259418\njulia> compute_Mder(projnep,3.0)\n1×1 Array{Float64,2}:\n -2.315345215259418\n\n\n\n\n\n"
},

{
    "location": "transformations/#NonlinearEigenproblems.NEPTypes.Proj_NEP",
    "page": "NEP Transformations",
    "title": "NonlinearEigenproblems.NEPTypes.Proj_NEP",
    "category": "type",
    "text": "abstract type Proj_NEP <: NEP\n\nProj_NEP represents a projected NEP. The projection is defined as the NEP\n\nN(λ)=W^HM(λ)V\n\nwhere M(λ) is a base NEP and W and V rectangular matrices representing a basis of the projection spaces. Instances are created with create_proj_NEP. See create_proj_NEP for examples.\n\nAny Proj_NEP needs to implement two functions to manipulate the projection:\n\nset_projectmatrices!: Set matrices W and V\nexpand_projectmatrices!: Effectively expand the matrices W and V with one column.\n\n\n\n\n\n"
},

{
    "location": "transformations/#NonlinearEigenproblems.NEPTypes.Proj_SPMF_NEP",
    "page": "NEP Transformations",
    "title": "NonlinearEigenproblems.NEPTypes.Proj_SPMF_NEP",
    "category": "type",
    "text": "struct Proj_SPMF_NEP <: Proj_NEP\n\nThis type represents the (generic) way to project NEPs which are AbstractSPMF. See examples in create_proj_NEP.\n\n\n\n\n\n"
},

{
    "location": "transformations/#Types-1",
    "page": "NEP Transformations",
    "title": "Types",
    "category": "section",
    "text": "NEPs for which this projection can be computed inherit from ProjectableNEP.ProjectableNEPThe result of the projection is represented in a Proj_NEP.Proj_NEPOne explicit instance is the Proj_SPMF_NEP.Proj_SPMF_NEP"
},

{
    "location": "transformations/#NonlinearEigenproblems.NEPTypes.create_proj_NEP",
    "page": "NEP Transformations",
    "title": "NonlinearEigenproblems.NEPTypes.create_proj_NEP",
    "category": "function",
    "text": "pnep=create_proj_NEP(orgnep::ProjectableNEP[,maxsize [,T]])\n\nCreate a NEP representing a projected problem N(λ)=W^HM(λ)V,  where the  base NEP is represented by orgnep. The optional parameter maxsize::Int determines how large the projected problem can be and T is the Number type used for the projection matrices (default ComplexF64). These are needed for memory preallocation reasons. Use set_projectmatrices! and expand_projectmatrices!  to specify projection matrices V and W.\n\nExample:\n\nThe following example illustrates that a projection of a NEP is also a NEP and we can for instance call compute_Mder on it:\n\njulia> nep=nep_gallery(\"pep0\")\njulia> V=Matrix(1.0*I,size(nep,1),2);\njulia> W=Matrix(1.0*I,size(nep,1),2);\njulia> pnep=create_proj_NEP(nep);\njulia> set_projectmatrices!(pnep,W,V);\njulia> compute_Mder(pnep,3.0)\n2×2 Array{Complex{Float64},2}:\n -2.03662+0.0im   13.9777+0.0im\n -1.35069+0.0im  -13.0975+0.0im\njulia> W\'*compute_Mder(nep,3.0)*V  # Gives the same result\n2×2 Array{Float64,2}:\n -2.03662   13.9777\n -1.35069  -13.0975\n\nIf you know that you will only use real projection matrices, you can specify this in at the creation:\n\njulia> pnep=create_proj_NEP(nep,2,Float64);\njulia> set_projectmatrices!(pnep,W,V);\njulia> compute_Mder(pnep,3.0)\n2×2 Array{Float64,2}:\n -2.03662   13.9777\n -1.35069  -13.0975\n\n\n\n\n\n"
},

{
    "location": "transformations/#NonlinearEigenproblems.NEPTypes.set_projectmatrices!",
    "page": "NEP Transformations",
    "title": "NonlinearEigenproblems.NEPTypes.set_projectmatrices!",
    "category": "function",
    "text": "set_projectmatrices!(pnep::Proj_NEP,W,V)\n\nSet the projection matrices for the NEP to W and V, i.e., corresponding the NEP: N(λ)=W^HM(λ)V. See also create_proj_NEP.\n\nExample\n\nThis illustrates if W and V are vectors of ones, the projected problem becomes the sum of the rows and columns of the original NEP.\n\njulia> nep=nep_gallery(\"pep0\")\njulia> pnep=create_proj_NEP(nep);\njulia> V=ones(200,1);  W=ones(200,1);\njulia> set_projectmatrices!(pnep,W,V);\njulia> compute_Mder(pnep,0)\n1×1 Array{Complex{Float64},2}:\n 48.948104019482756 + 0.0im\njulia> sum(compute_Mder(nep,0),dims=[1,2])\n1×1 Array{Float64,2}:\n 48.948104019482955\n\n\n\n\n\n"
},

{
    "location": "transformations/#NonlinearEigenproblems.NEPTypes.expand_projectmatrices!",
    "page": "NEP Transformations",
    "title": "NonlinearEigenproblems.NEPTypes.expand_projectmatrices!",
    "category": "function",
    "text": "expand_projectmatrices!(nep::Proj_SPMF_NEP, Wnew, Vnew)\n\nThe projected NEP is updated by adding the last column of Wnew and Vnew to the basis. Note that Wnew and Vnew contain also the \"old\" basis vectors. See also create_proj_NEP\n\nExample:\n\nIn the following example you see that the expanded projected problem has one row and column more, and the leading subblock is the same as the smaller projected NEP.\n\njulia> nep=nep_gallery(\"pep0\"); n=size(nep,1);\njulia> V=Matrix(1.0*I,n,2); W=Matrix(1.0*I,n,2);\njulia> pnep=create_proj_NEP(nep);\njulia> set_projectmatrices!(pnep,W,V);\njulia> compute_Mder(pnep,0)\n2×2 Array{Complex{Float64},2}:\n 0.679107+0.0im   -0.50376+0.0im\n 0.828413+0.0im  0.0646768+0.0im\njulia> Vnew=[V ones(n)]\njulia> Wnew=[W ones(n)]\njulia> expand_projectmatrices!(pnep,Wnew,Vnew);\njulia> compute_Mder(pnep,0)\n3×3 Array{Complex{Float64},2}:\n 0.679107+0.0im   -0.50376+0.0im  -12.1418+0.0im\n 0.828413+0.0im  0.0646768+0.0im   16.3126+0.0im\n -17.1619+0.0im   -10.1628+0.0im   48.9481+0.0im\n\n\n\n\n\n"
},

{
    "location": "transformations/#Associated-functions-1",
    "page": "NEP Transformations",
    "title": "Associated functions",
    "category": "section",
    "text": "You can create a projected NEP with create_proj_NEP:create_proj_NEPset_projectmatrices!expand_projectmatrices!"
},

{
    "location": "transformations/#NonlinearEigenproblems.NEPTypes.effenberger_deflation",
    "page": "NEP Transformations",
    "title": "NonlinearEigenproblems.NEPTypes.effenberger_deflation",
    "category": "function",
    "text": "effenberger_deflation(nep::NEP,S0,V0)\n\nThis function creates a deflated NEP based on (S0,V0), which are assumed to an invariant pair of nep. Effectively, the function should return a NEP which has the same solutions as orgnep, except those corresponding to (S0,V0).\n\nExample:\n\njulia> nep=nep_gallery(\"dep0\");\njulia> (λ,v)=newton(nep);\njulia> n=size(nep,1);\njulia> S0=reshape([λ],1,1);\njulia> V0=reshape(v,n,1);\njulia> dnep=effenberger_deflation(nep,S0,V0)\njulia> (λ2,v2)=augnewton(dnep);  # this converges to different eigval\njulia> minimum(svdvals(compute_Mder(nep,λ2)))\n9.323003321058995e-17\n\nReferences\n\nC. Effenberger, Robust solution methods for nonlinear eigenvalue problems, PhD thesis, 2013, EPF Lausanne\n\n\n\n\n\n"
},

{
    "location": "transformations/#Deflation-1",
    "page": "NEP Transformations",
    "title": "Deflation",
    "category": "section",
    "text": "Due to structure of the representation of NEPs in NEP-PACK it is possible to do deflation, by transformation of the NEP-object. The deflation is based on theory provided in Effenbergers thesis and the main function consists of effenberger_deflation.effenberger_deflation"
},

{
    "location": "gallery/#",
    "page": "NEP Gallery",
    "title": "NEP Gallery",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/#NonlinearEigenproblems.Gallery.nep_gallery",
    "page": "NEP Gallery",
    "title": "NonlinearEigenproblems.Gallery.nep_gallery",
    "category": "function",
    "text": " nep=nep_gallery(name)\n nep=nep_gallery(name,params)\n nep=nep_gallery(name,params;kwargs)\n\nCollection of nonlinear eigenvalue problems. Returns a NEP object from a gallery of examples of nonlinear eigenvalue problems. The parameter name decides which NEP.\n\nSupported problems:\n\nThe following list describes the NEP with a certain name and the associated parameters (params) and keyword arguments (kwargs), if any.\n\n\ndep0   Create a random delay eiganvalue problem with one delay tau = 1.\n  One optional params determining the size (default = 5)\ndep0_sparse\n  Create a random delay eiganvalue problem with sparse matrices and one delay tau = 1.\n  Two optional params determining the size (default = 5) and the fill (default = 0.25)\ndep0_tridiag\n  Create a random delay eiganvalue problem with sparse tridiaognal matrices and one delay tau = 1.\n  One optional params determining the size (default = 100)\ndep_symm_double\n  Create delay eiganvalue problem with double eigenvalues and sparse symmetric matrices and one delay tau = 1.\n  Examle from H. Voss and M. M. Betcke, Restarting iterative projection methods for Hermitian nonlinear eigenvalue problems with minmax property, Numer. Math., 2017\n  One optional params determining the size (default = 100)\ndep_double\n  Create problem with a double non-semisimple eigenvalue in λ=3πi.\n  Example from E. Jarlebring, Convergence factors of Newton methods for nonlinear eigenvalue problems, LAA, 2012\ndep1\n  A delay eigenvalue problem with one eigenvalue equal to one.\npep0\n  Create a random polynomial eigenvalue problem.\n  One optional params determining the size (default = 200)\npep0_sym\n  Creates a random symmetric polynomial eigenvalue problem.\n  One optional params determining the size (default = 200)\npep0_sparse\n  Creates a random polynomial eigenvalue problem with sparse matrices.\n  Two optional params determining the size (default = 200) and the fill (default = 0.03)\nreal_quadratic\n  Creates a quadratic problem with real eigenvalues.\n        Four smallest eigenvalues of the problem:\n        -2051.741417993845\n        -182.101627437811\n        -39.344930222838\n        -4.039879577113\ndep_distributed\n  Creates the NEP associated with example in E. Jarlebring and W. Michiels and K. Meerbergen,   The infinite Arnoldi method and an application to time-delay systems with distributed delays,   Delay Systems - Methods, Applications and New Trends, 2012.\n       Some correct eigenvalues:        -0.400236388049641 + 0.970633098237807i,\n       -0.400236388049641 - 0.970633098237807i,\n       2.726146249832675 + 0.000000000000000i,\n       -1.955643591177653 + 3.364550574688863i,\n       -1.955643591177653 - 3.364550574688863i,\n       4.493937056300693 + 0.000000000000000i,\n       -1.631513006819252 + 4.555484848248613i,\n       -1.631513006819252 - 4.555484848248613i,\n       -1.677320660400946 + 7.496870451838560i,\n       -1.677320660400946 - 7.496870451838560i\nqdep0 \n  Quadratic delay eigenvalue problem in S. W. Gaaf and E. Jarlebring, The infinite Bi-Lanczos method for   nonlinear eigenvalue problems, SIAM J. Sci. Comput., 2017\nqdep1 \n  Quadratic delay eigenvalue problem in E. Jarlebring and W. Michiels and K. Meerbergen,   A linear eigenvalue algorithm for the  nonlinear eigenvalue problem, Numer. Math., 2011\nqep_fixed_eig\n  A quadratic eigenvalue problem with chosen eigenvalues.\n  Two optional params determining the size (default = 5)   and a vector containing the eigenvalues (default = randn)\nneuron0\n  A DEP that stems from L. P. Shayer and S. A. Campbell, Stability, bifurcation and multistability   in a system of two coupled neurons with multiple time delays,   SIAM J. Applied Mathematics, 2000. It is also a benchmark example in DDE-BIFTOOL\nschrodinger_movebc \n  This NEP stems from the discretization of a Schrödinger equation as described in the NEP-PACK online tutorial. The nonlinearity contains sinh(), cosh() and sqrt(). The optional parameters are size of discretization n  and domain and potential description L0,L1,α and V0.\nbeam\n  The DEP modelling a beam with delayed stabilizing feedback described in R. Van Beeumen, E. Jarlebring, and W. Michiels,   A rank-exploiting infinite Arnoldi algorithm for nonlinear eigenvalue problems, 2016.\n  The A1-term has rank one.\n  One optional params which is the size of the matrix (defalut = 100)\nsine \n  The NEP formed by the sum of a polynomial and a sine-function in \"A rank-exploiting infinite Arnoldi   algorithm for nonlinear eigenvalue problems\", R. Van Beeumen, E. Jarlebring and W. Michiels, 2016. The sine-term has rank one.\nThe MATLAB-package \"NLEVP: A Collection of Nonlinear Eigenvalue Problems, ACM Transactions on Mathematical Software 39(2), January 2011,   T. Betcke, N. J. Higham, V. Mehrmann, Ch. Schröder, F. Tisseur\" provides a number of benchmark problems for NEPs.   These are available in NEP-PACK in two different ways. We have native implementations of some problems (referred to as nlevp_native_)   and the separate GalleryNLEVP. The native implementation is preferred since the GalleryNLEVP   interfaces with MATLAB and is therefore considerably slower.\nnlevp_native_gun\n  The benchmark problem from the NLEVP-collection called \"gun\", represented in the native NEP-PACK format.   B.-S. Liao, Z. Bai, L.-Q. Lee, and K. Ko. Nonlinear Rayleigh-Ritz iterative method for solving large scale   nonlinear eigenvalue problems.  Taiwan. Journal of Mathematics, 14(3):869–883, 2010\nnlevp_native_cd_player\n  The benchmark problem from the NLEVP-collection called \"cd_player\", represented in the native NEP-PACK format.   Y. Chahlaoui, and P. M. Van Dooren, Benchmark examples for model reduction of linear time-   invariant dynamical systems. In Dimension Reduction of Large-Scale Systems, P. Benner, V. Mehrmann,   and D. C. Sorensen, Eds. Lecture Notes in Computational Science and Engineering Series, vol. 45.   Springer-Verlag, Berlin, 380–392, 2005.\n  and\n  P. M. R. Wortelboer, M. Steinbuch, and  O. H. Bosgra, Closed-loop balanced reduction with   application to a compact disc mechanism. In Selected Topics in Identification, Modeling and Control.   Vol. 9. Delft University Press, 47–58, 1996.\n  and\n  W. Draijer, M. Steinbuch, and  O. H. Bosgra, Adaptive control of the radial servo system of a   compact disc player. Automatica 28, 3, 455–462. 1992.\n\n\nnlevp_native_fiber\n  The benchmark problem from the NLEVP-collection called \"fiber\", represented in the native NEP-PACK format.   One of terms in this problem is approximated by interpolation, and may not always coincide with the benchmark.   L. Kaufman, Eigenvalue problems in fiber optic design. SIAM J. Matrix Anal. Appl. 28, 1, 105–117, 2006.\n  and\n  X. Huang, Z. Bai, and Y. Su, Nonlinear rank-one modification of the symmetric eigenvalue problem. J. Comput. Math. 28, 2, 218–234, 2010\n\nnlevp_native_hadeler\n  The benchmark problem from the NLEVP-collection called \"hadeler\", represented in the native NEP-PACK format. The problem is of the form M(λ)=(e^λ-1)B+A0+A2λ^2. \n  Hadeler K.  P.  1967.  Mehrparametrige  und  nichtlineare  Eigenwertaufgaben. Arch.  Rational  Mech. Anal. 27, 4, 306–328.\n\nnlevp_native_pdde_stability\n  The benchmark problem from the NLEVP-collection called \"pdde_stability\", represented in the native NEP-PACK format.   This problem is a quadratic eigenvalue with arbitrary given size n. See   E. Jarlebring, The Spectrum of Delay-Differential Equations:   Numerical Methods, Stability and Perturbation, PhD thesis,   TU Braunschweig, Institut Computational Mathematics, Germany, 2008 and \n  H. Fassbender, N. Mackey, D. S. Mackey and C. Schroeder, Structured   Polynomial Eigenproblems Related to Time-Delay Systems, ETNA, 2008, vol 31, pp 306-330\n\nnlevp_native_loaded_string\n  The benchmark problem from the NLEVP-collection called \"pdde_stability\", represented in the native NEP-PACK format. The parameters are (n,kappa,m) where n is the size, and the NEP is a SPMF with rational terms and the coefficient matrices are rank one modifications of Toeplitz matrices.\n S. I. Solov\"ev. Preconditioned iterative methods for a class of nonlinear eigenvalue problems. Linear Algebra Appl., 415 (2006), pp.210-229.\nbem_fichera\n  Represents a boundary element discretization of Helmholtz equation for a domain consisting of the unit cube, except one removed corner (Fichera corner). The mesh is hardcoded. The parameter N determines the size of the problem (default N = 5). The model stems from the model in these papers:\n Steinlechner, A boundary element method for solving PDE eigenvalue problems, M. Steinlechner, bachelor thesis, ETH Zürich, 2010\n Effenberger and Kressner, Chebyshev interpolation for nonlinear eigenvalue problems, BIT Numerical Mathematics, December 2012, Volume 52, Issue 4, pp 933–951\ndtn_dimer\n NEP described in J. Araujo-Cabarcas, C. Engström and E. Jarlebring, Efficient resonance computations for Helmholtz problems based on a Dirichlet-to-Neumann map, J. Comput. Appl. Math., 330:177-192, 2018  (http://arxiv.org/pdf/1606.09547) where the nonlinearity stems from the application of Dirichlet-to-Neumann map. The problem contains quotients of Bessel functions and derivatives of Bessel functions. This NEP takes two parameters: data_dir::String and l::Int. The data_dir specifies the directory of the dowloaded FEM-matrices (available here https://umu.app.box.com/s/b52yux3z9rcl8y0l7la22k0vi062cvu5). The integer l specifies the number of DtN-terms: 2*l+1.   \n J. Araujo-Cabarcas, C. Engström and E. Jarlebring, Efficient resonance computations for Helmholtz problems based on a Dirichlet-to-Neumann map, J. Comput. Appl. Math., 330:177-192, 2018  (http://arxiv.org/pdf/1606.09547).\n\nExample\n\njulia> nep=nep_gallery(\"dep0\",100);\njulia> norm(compute_Mlincomb(nep,1.0+1.0im,ones(size(nep,1))))\n104.76153002802755\n\nSee also the following galleries:\n\nGalleryNLEVP\nGalleryWaveguide\n\n\n\n\n\n"
},

{
    "location": "gallery/#The-Gallery-function-1",
    "page": "NEP Gallery",
    "title": "The Gallery function",
    "category": "section",
    "text": "A large number of examples are provided in the nep_gallery.julia> using Gallery\njulia> nep=nep_gallery(\"dep0\")\njulia> λ,v=newton(nep)\n(-0.3587189459686265 + 0.0im, Complex{Float64}[0.284742+0.0im, -0.143316+0.0im, 0.278378+0.0im, -0.5009+0.0im, -0.613634+0.0im])\njulia> norm(compute_Mlincomb(nep,λ,v))\n4.718447854656915e-16nep_gallery"
},

{
    "location": "gallery/#Berlin-Manchester-collection-1",
    "page": "NEP Gallery",
    "title": "Berlin-Manchester collection",
    "category": "section",
    "text": "If MATLAB and the Berlin-Manchester collection are installed, we can access them with the GalleryNLEVP (which does MATLAB-access through Julia\'s MATLAB-package).julia> using GalleryNLEVP\njulia> nep=nep_gallery(NLEVP_NEP,\"hadeler\")\njulia> λ,v=quasinewton(nep,λ=0.2,displaylevel=1,maxit=20,tol=1e-10);\njulia> norm(compute_Mlincomb(nep,λ,v))/norm(v)\n9.698206079849311e-11Problems loaded from the Berlin-Manchester collection are NEP-objects where every call to access a function generates a call to an underlying MATLAB-session. Some problems in the Berlin-Manchester collection have native support in NEP-PACK, i.e., avoiding a MATLAB-access in every call; see nep_gallery above."
},

{
    "location": "gallery/#Other-gallery-examples-1",
    "page": "NEP Gallery",
    "title": "Other gallery examples",
    "category": "section",
    "text": "Stand-alone implementation can be accessed in a similar way, e.g., a native implementation of the Waveguide Eigenvalue Problem can be accessed asjulia> using GalleryWaveguide\njulia> nep=nep_gallery(WEP,benchmark_problem=\"TAUSCH\");"
},

{
    "location": "movebc_tutorial/#",
    "page": "Tutorial 1 (ABC)",
    "title": "Tutorial 1 (ABC)",
    "category": "page",
    "text": ""
},

{
    "location": "movebc_tutorial/#Tutorial:-Application-to-absorbing-boundary-conditions-1",
    "page": "Tutorial 1 (ABC)",
    "title": "Tutorial: Application to absorbing boundary conditions",
    "category": "section",
    "text": ""
},

{
    "location": "movebc_tutorial/#A-Schrödinger-equation-1",
    "page": "Tutorial 1 (ABC)",
    "title": "A Schrödinger equation",
    "category": "section",
    "text": "We consider the  Schrödinger type eigenvalue problem on the interval 0L_1,begineqnarray*\n left(\n fracpartial^2partial x^2\n-V(x)-lambda\nright)psi(x)=0 xin0L_1\n   psi(0)=0\n   psi(L_1)=0\nendeqnarray*We wish to compute eigenvalue λ and eigenfunction psi. Moreover, we assume that the potential function V(x) is benign in the domain L_0L_1, in our case for simplicity it is constant, such that we can later solve the problem in that domain analytically. In the simulations we will consider this function  V(x)=\nbegincases\n1+sin(alpha x)   xin0L_0=01\nV_0  xin(L_0L_1)=(18)\nendcaseswhere α is large, i.e., the potential has high frequency oscillations in one part of the domain.<br>\n<img src=\"https://user-images.githubusercontent.com/11163595/49676288-62c71080-fa79-11e8-8542-3b7857720473.png\" height=300>This tutorial illustrates how we can avoid a discretization of the domain L_0L_1 and only discretize 0L_0, by solving a NEP. The implementation described below is also directly available in the gallery: nep_gallery(\"schrodinger_movebc\")."
},

{
    "location": "movebc_tutorial/#Derivation-of-reduced-domain-differential-equation-1",
    "page": "Tutorial 1 (ABC)",
    "title": "Derivation of reduced domain differential equation",
    "category": "section",
    "text": "The technique is based on moving the boundary condition at L_1 to L_0. This can be done without doing any approximation, if we allow the new artificial boundary condition at L_0 to depend on λ. We introduce what is called an absorbing boundary condition, also known as a artificial boundary condition.We first note that we can transform the problem to first order form  fracddx\nbeginbmatrixpsi(x)psi(x)endbmatrix\n=\nbeginbmatrix\n0  1\nlambda+V(x)  0\nendbmatrix\nbeginbmatrixpsi(x)psi(x)endbmatrixThe potential V(x) is constant in the domain L_0L_1. This  allows us to directly express the solution using the matrix exponentialbeginbmatrixpsi(x)psi(x)endbmatrix\n=expleft((x-L_0)\nbeginbmatrix\n0  1\nlambda+V_0  0\nendbmatrix\nright)\nbeginbmatrixpsi(L_0)psi(L_0)endbmatrixwhen xinL_0L_1. The boundary condition psi(L_1)=0 can be imposed as0=psi(L_1)=beginbmatrix1  0endbmatrix\nbeginbmatrixpsi(L_1)psi(L_1)endbmatrix\n=beginbmatrix1  0endbmatrixexpleft((L_1-L_0)\nbeginbmatrix\n0  1\nlambda+V_0  0\nendbmatrix\nright)\nbeginbmatrixpsi(L_0)psi(L_0)endbmatrixBy explicitly using the hyperbolic functions formula for the matrix exponential of an antidiagonal two-by-two matrix we obtain the relation0=\ng(λ)psi(L_0)+\nf(λ)psi(L_0)whereg(λ)=coshleft((L_1-L_0)sqrtλ+V_0right)f(λ)=fracsinhleft((L_1-L_0)sqrtλ+V_0right)sqrtλ+V_0Note that a solution to the original boundary value problem will satisfy the condition 0=g(λ)psi(L_0)+f(λ)psi(L_0), which involves only the point x=L_0, i.e., the middle of the domain. We can now disconnect the problem and only consider only the domain 0L_0 by using this condition instead, since a solution to the original boundary value problem satisfiesbegineqnarray*\n left(\n fracpartial^2partial x^2\n-V(x)-lambda\nright)psi(x)=0 xin0L_0\n   psi(0)=0\n   g(λ)psi(L_0)+f(λ)psi(L_0)=0\nendeqnarray*which is a boundary value problem on the reduced domain 0L_0. The boundary condition is a Robin boundary condition (also called mixed boundary condition) at x=L_0, since it contains both psi(L_0) and psi(L_0). It can be shown that the solutions to the original problem are the same as the solutions on the reduced domain, except for some unintresting special cases."
},

{
    "location": "movebc_tutorial/#Discretization-of-the-λ-dependent-boundary-value-problem-1",
    "page": "Tutorial 1 (ABC)",
    "title": "Discretization of the λ-dependent boundary value problem",
    "category": "section",
    "text": "The boundary condition in the reduced domain boundary value problem is λ-dependent. Therefore a standard discretization the domain 0L_0, e.g., finite difference, will lead to a nonlinear eigenvalue problem. More precisely, we discretize the problem as follows.Let x_k=hk, k=1ldots n and h=1n such that x_1=h and x_n=1=L_0. An approximation of the lambda-dependent boundary condition can be found with the one-sided second order difference scheme   0=g(λ)psi(L_0)+f(λ)frac1hleft(frac32 psi(L_0)\n-2psi(x_n-1)\n+frac12psi(x_n-2)right)+O(h^2)Let  D_n=\nfrac1h^2\nbeginbmatrix\n-2   1  0 \n1  ddots 1 \n0  1 -2  1\n0  cdots  0  0\nendbmatrixtextrm and \nunderlineI_n=beginbmatrix1  ddots 1    0endbmatrixThen the boundary value problem can expressed asM(λ)v=0whereM(λ)=A-λunderlineI_n\n+g(λ)e_ne_n^T+f(λ)FandA=D_n-operatornamediag(V(x_1)ldotsV(x_n-1)0)F=frac12he_ne_n-2^T-frac2he_ne_n-1^T+frac32he_ne_n^T"
},

{
    "location": "movebc_tutorial/#Implementation-in-NEP-PACK-1",
    "page": "Tutorial 1 (ABC)",
    "title": "Implementation in NEP-PACK",
    "category": "section",
    "text": "The above discretization can be expressed as a SPMF with four terms. Let us set up the matrices firstL0=1; L1=8; V0=10.0;\nxv=Vector(range(0,stop=L0,length=1000))\nh=xv[2]-xv[1];\nn=size(xv,1);\nα=25*pi/2;\nV=x->1+sin(α*x);\nDn=spdiagm(-1 => [ones(n-2);0]/h^2, 0 => -2*ones(n-1)/h^2, 1 => ones(n-1)/h^2)\nVn=spdiagm(0 => [V.(xv[1:end-1]);0]);\nA=Dn-Vn;\nIn=spdiagm(0 => [ones(n-1);0])\nF=sparse([n, n, n],[n-2, n-1, n],[1/(2*h), -2/h, 3/(2*h)])\nG=sparse([n],[n],[1]);The corresponding functions in the SPMF are defined as followsf1=S->one(S);\nf2=S->-S;\nhh=S-> sqrt(S+V0*one(S))\ng=S-> cosh((L1-L0)*hh(S))\nf=S-> inv(hh(S))*sinh((L1-L0)*hh(S))Note that when defining an SPMF all functions should be defined in a matrix function sense (not element-wise sence). Fortunately, in Julia, sinh(A) and cosh(A) for matrix A are interpreted as matrix functions. The NEP can now be created and solved by directly invoking the SPMF-creator and applying a NEP-solver:using NonlinearEigenproblems\nnep=SPMF_NEP([Dn-Vn,In,G,F],[f1,f2,g,f]);\n(λ1,v1)=quasinewton(Float64,nep,displaylevel=1,λ=-5,v=ones(n),tol=1e-9);\n(λ2,v2)=quasinewton(nep,displaylevel=1,λ=-11,v=ones(n),tol=1e-9)\n(λ3,v3)=quasinewton(nep,displaylevel=1,λ=-20,v=ones(n),tol=1e-9)\n(λ4,v4)=quasinewton(nep,displaylevel=1,λ=-35,v=ones(n),tol=1e-9)We can easily do a sanity check of the solution by visualizing it in this wayusing Plots\nplot(xv,v1/norm(v1))\nplot!(xv,real(v2)/norm(v2))\nplot!(xv,real(v3)/norm(v3))\nplot!(xv,real(v4)/norm(v4))resulting in<br>\n<img src=\"https://user-images.githubusercontent.com/11163595/49675575-96ed0200-fa76-11e8-8341-b3faef1e800b.png\" height=450>"
},

{
    "location": "movebc_tutorial/#Measuring-error-1",
    "page": "Tutorial 1 (ABC)",
    "title": "Measuring error",
    "category": "section",
    "text": "For this application, the matrix M(λ) has very large elements if n is large. This makes the default way to measure the error a bit misleading. We now show how to specify a user-defined way to measure the error.The following function provides an estimate of the backward errore(lambdav)=fracM(lambda)vv(D_n-operatornamediag(V(x_1)ldotsV(x_n-1)0)+λ\n+g(λ)+f(λ)F)which we define as a functionmyerrmeasure=(λ,v) ->\n    norm(compute_Mlincomb(nep,λ,v))/\n       (norm(v)*(norm(A)*abs(f1(λ))+norm(In)*abs(f2(λ))+norm(G)*abs(g(λ))+norm(F)*abs(f(λ))))\nNote that unlike many other languages, Julia\'s norm-function for matrices, returns the Frobenius norm by default.The  quasinewton simulations above terminate in less iterations when this error measure is used. It also allows us to also use other methods, e.g., infinite Arnoldi method.julia> (λ,v)=iar(nep,displaylevel=1,σ=-36,v=ones(n),tol=1e-9,\n                 errmeasure=myerrmeasure,Neig=5,maxit=100);\nIteration:1 conveig:0\nIteration:2 conveig:0\nIteration:3 conveig:0\nIteration:4 conveig:0\nIteration:5 conveig:0\nIteration:6 conveig:0\nIteration:7 conveig:0\nIteration:8 conveig:0\nIteration:9 conveig:1\nIteration:10 conveig:1\nIteration:11 conveig:1\n...\nIteration:30 conveig:3\nIteration:31 conveig:3\nIteration:32 conveig:4\nIteration:33 conveig:4\nIteration:34 conveig:4\nIteration:35 conveig:4\nIteration:36 conveig:4\nIteration:37 conveig:4\nIteration:38 conveig:4\njulia> λ\n5-element Array{Complex{Float64},1}:\n  -34.93072323018405 + 4.272712516424266e-18im\n  -39.14039540604307 + 2.054980381709175e-16im\n -31.057106551809486 - 3.2616991503097867e-15im\n  -43.66198303378091 - 4.3753274496659e-15im\n -27.537645678335437 + 4.8158177866759774e-15imtip: Tip\nThe performance of many NEP-algorithms for this problem can be improved. One improvement is achieved with a simple variable transformation. If we let mu=sqrtlambda+V_0 we have lambda=mu^2-V_0. Therefore the NEP can be transformed in a way that it does not contain square roots. Square roots are undesirable, since they can limit convergence in many methods due to the fact that they are not entire functions. The sinh and cosh can be merged to a tanh-expression, leading to less nonlinear terms (but possibly more difficult singularities)."
},

{
    "location": "movebc_tutorial/#Verifying-the-solution-1",
    "page": "Tutorial 1 (ABC)",
    "title": "Verifying the solution",
    "category": "section",
    "text": "Let us verify the solution with a direct discretization of the domain. The ApproxFun.jl package provides tools to solve differential equations in one dimension. We use this package to discretize the entire domain 0L_1, whereas only a discretization of 0L_0 is necessary in the NEP-approach.The eigenvalues of the operator can be computed as follows (where we approximate the singular point of the potential with a regularized heaviside function).julia> using LinearAlgebra, ApproxFun;\njulia> x = Fun(0 .. 8)\njulia> V0 = 10;\njulia> α = 25*pi/2;\njulia> # Let Ha be an approximation of H(x-1) where H is a Heaviside function\njulia> kk=10; Ha = 1 ./(1+exp(-2*kk*(x .- 1.0)));\njulia> VV=V0*Ha + (1-Ha) * sin(α*x)\njulia> L = 𝒟^2-VV\njulia> S = space(x)\njulia> B = Dirichlet(S)\njulia> ee= eigvals(B, L, 500,tolerance=1E-10);We obtain approximations of the same eigenvalues as with the NEP-approachjulia> ee[sortperm(abs.(ee.+36))[1:5]]\n -34.85722089717211\n -39.051578662445074\n -30.984470654329677\n -43.54933251507695\n -27.450712883781343(Image: To the top)"
},

{
    "location": "bemtutorial/#",
    "page": "Tutorial 2 (BEM)",
    "title": "Tutorial 2 (BEM)",
    "category": "page",
    "text": ""
},

{
    "location": "bemtutorial/#Tutorial:-User-defined-matrices-boundary-element-method-1",
    "page": "Tutorial 2 (BEM)",
    "title": "Tutorial: User-defined matrices - boundary element method",
    "category": "section",
    "text": "Suppose you have a new type of NEP, which does not naturally fit into the standard types in NEP-PACK. This tutorial shows how you can define a NEP where the only way to access the NEP is a function to compute M^(k)(λ). To illustrate this we use a boundary element method approach for computation of resonances. The complete code is available in gallery_extra/bem_hardcoded. The example is also available as a gallery problem: nep=nep_gallery(\"bem_fichera\")."
},

{
    "location": "bemtutorial/#Boundary-element-method-1",
    "page": "Tutorial 2 (BEM)",
    "title": "Boundary element method",
    "category": "section",
    "text": "The boundary element method applied to Helmholtz eigenvalue problem can be described by the matrix consisting of elementsM(λ)_ij=frac14piint_Delta_iint_Delta_jfrace^iotalambdaxi-etaxi-etadS(eta)dS(xi)where Delta_i,i=1ldotsn are boundary elements. The boundary element approach is available through three functionsmesh=gen_ficheramesh(N) # computes a mesh\nprecompute_quad!(mesh,gauss_order) # precompute quadrature coefficients\nassemble_BEM(λ, mesh, gauss_order,der) # Compute the matrix consisting of all the integrals corresponding to λThese functions are based on the model (and inspired by some of the code) in \"A boundary element method for solving PDE eigenvalue problems\", Steinlechner, bachelor thesis, ETH Zürich, 2010 and also used in the simulations in \"Chebyshev interpolation for nonlinear eigenvalue problems\", Effenberger, Kressner, BIT Numerical Mathematics, 2012, Volume 52, Issue 4, pp 933–951."
},

{
    "location": "bemtutorial/#Implementation-in-NEP-PACK-1",
    "page": "Tutorial 2 (BEM)",
    "title": "Implementation in NEP-PACK",
    "category": "section",
    "text": "In order to define your new NEP you need to define a new NEP-typestruct BEM_NEP <: NEP\n    mesh::Vector{Triangle}\n    n::Int\n    gauss_order::Int\nendThe mesh variable is a vector of triangle objects defining the domain, n is the size of the mesh and gauss_order the quadrature order. All NEPs have to defined size() functions# We overload the size function from Base so we need to import it explicitly\nimport Base.size;\nfunction size(nep::BEM_NEP)\n    return (nep.n,nep.n);\nend\nfunction size(nep::BEM_NEP,dim)\n    return nep.n;\nendThe function assemble_BEM computes the matrix defined by the integrals. Hence, we need to call this function for every call to compute_Mder:import NonlinearEigenproblems.NEPCore.compute_Mder # We overload the function\nfunction compute_Mder(nep::BEM_NEP,λ::Number,der::Int=0)\n    return assemble_BEM(λ, nep.mesh, nep.gauss_order,der)[:,:,1];\nendIn order to make other compute functions available to the methods, we can use the conversion functions. In particular, the compute_Mlincomb function can be implemented by making several calls in compute_Mder. This is done in the NEP-PACK-provided helper function compute_Mlincomb_from_Mder. We make this the default behaviour for this NEP:import NonlinearEigenproblems.NEPCore.compute_Mlincomb # Since we overload\n# Delegate the compute Mlincomb functions. This can be quite inefficient.\ncompute_Mlincomb(nep::BEM_NEP,λ::Number,V::AbstractVecOrMat, a::Vector) =\n      compute_Mlincomb_from_Mder(nep,λ,V,a)\ncompute_Mlincomb(nep::BEM_NEP,λ::Number,V::AbstractVecOrMat) =\n      compute_Mlincomb(nep,λ,V, ones(eltype(V),size(V,2)))We can now create a BEM_NEP as follows:gauss_order=3; N=5;\nmesh=gen_ficheramesh(5)\nprecompute_quad!(mesh,gauss_order)\nnep=BEM_NEP(mesh,gauss_order);"
},

{
    "location": "bemtutorial/#Solving-the-NEP-1",
    "page": "Tutorial 2 (BEM)",
    "title": "Solving the NEP",
    "category": "section",
    "text": "After creating the NEP, you can try to solve the problem with methods in the package, e.g., MSLP works quite well for this problem:julia> (λ,v)=mslp(nep,λ=8,displaylevel=1)\nIteration:1 errmeasure:4.122635537095636e-6 λ=8.128272919317748 + 0.007584851218214716im\nIteration:2 errmeasure:1.787963303973586e-8 λ=8.132181234599427 - 1.952792817964521e-5im\nIteration:3 errmeasure:3.2884958163572594e-13 λ=8.132145310156643 - 1.2648247028455485e-5im\nIteration:4 errmeasure:4.6607986030841e-18 λ=8.132145310195453 - 1.264891804832194e-5im\n(8.132145310195453 - 1.264891804832194e-5im, Complex{Float64}[3.08473e-5-9.8713e-6im, 9.46458e-5+2.08586e-5im, -0.000418303-9.3624e-5im, -2.27161e-5+3.2045e-5im, -0.00168228-0.000446522im, -0.00660488-0.0018462im, -0.00705554-0.00195021im, -0.000714245-0.000123651im, -0.010653-0.00296256im, -0.0250155-0.00702815im  …  0.00369925+0.00101557im, 0.025547+0.00717101im, 0.0333126+0.00931856im, 0.0158614+0.00438927im, 0.00325204+0.000835354im, 0.021329+0.00595943im, 0.0126512+0.0034611im, 0.00130882+0.000172086im, 0.00131286+0.000207463im, 0.0125435+0.00344975im])This is the computed solution:<br>\n<img src=\"https://user-images.githubusercontent.com/11163595/49595409-324b7d80-f978-11e8-818d-eeeaf9441505.png\" height=450>The plotting was done with the following code (by using internals of the BEM-implementation):using NonlinearEigenproblems, PyPlot\nnep=nep_gallery(\"bem_fichera\")\n(λ,v)=mslp(nep,λ=8.1,displaylevel=1)\nv=v./maximum(abs.(v));\nfor k=1:size(nep.mesh,1);\n    tri=nep.mesh[k];\n    col=[1-abs.(v)[k];0;0]; # plot abslolute value\n    X=[tri.P1[1] tri.P2[1]; tri.P3[1] tri.P3[1]];\n    Y=[tri.P1[2] tri.P2[2]; tri.P3[2] tri.P3[2]];\n    Z=[tri.P1[3] tri.P2[3]; tri.P3[3] tri.P3[3]];\n    plot_surface(X,Y,Z,color=col,alpha=0.8);\n    plot_wireframe(X,Y,Z,color=[0;0;0],linewidth=1,alpha=0.5,);\nendNote: The above functionality can also be achieved with  Mder_NEP in the development version of NEP-PACK(Image: To the top)"
},

{
    "location": "deflate_tutorial/#",
    "page": "Tutorial 3 (Deflation)",
    "title": "Tutorial 3 (Deflation)",
    "category": "page",
    "text": ""
},

{
    "location": "deflate_tutorial/#Tutorial:-Computing-several-solutions-with-deflation-1",
    "page": "Tutorial 3 (Deflation)",
    "title": "Tutorial: Computing several solutions with deflation",
    "category": "section",
    "text": ""
},

{
    "location": "deflate_tutorial/#Background-1",
    "page": "Tutorial 3 (Deflation)",
    "title": "Background",
    "category": "section",
    "text": "Several algorithms for NEPs compute one solution to the NEP given a starting value. In many applications several solutions are of interest. Let us first consider the trivial partial \"work-around\": You can try to run an algorithm which computes one eigenvalue twice with different starting values, e.g., quasinewton as in this example:julia> nep=nep_gallery(\"dep0\");\njulia> (λ1,_)=quasinewton(nep,λ=0,v=ones(size(nep,1)))\n(-0.3587189459686377 + 0.0im, Complex{Float64}[4.41411+0.0im, -2.22171+0.0im, 4.31544+0.0im, -7.76501+0.0im, -9.51261+0.0im])\njulia> (λ2,_)=quasinewton(nep,λ=1im,v=ones(size(nep,1)))\n(-0.04093521177097875 + 1.4860115309416284im, Complex{Float64}[-3.28271+11.7399im, 5.08623-8.05479im, 7.16697-6.25547im, -2.69349+4.63954im, -9.91065+14.4678im])This simple approach often suffers from the problem called reconvergence (we obtain the same solution again) or solutions of interest may be missed. In this case we get reconvergence when we use starting value -1:julia> (λ3,_)=quasinewton(nep,λ=-1,v=ones(size(nep,1)))\n(-0.358718945968621 + 0.0im, Complex{Float64}[-6.65881+0.0im, 3.35151+0.0im, -6.50997+0.0im, 11.7137+0.0im, 14.3501+0.0im])Note that applying the algorithm with starting values λ=0 and λ=-1 lead to the same solution. Other solution methods do not suffer from this, e.g., block Newton method, the infinite Arnoldi method and nleigs since they compute several solutions at once. Another remedy is the use of deflation."
},

{
    "location": "deflate_tutorial/#Deflation-in-NEP-PACK-1",
    "page": "Tutorial 3 (Deflation)",
    "title": "Deflation in NEP-PACK",
    "category": "section",
    "text": "The term deflation is referring to making something smaller (in the sense of opposite of inflating a balloon). In this case we can make the solution set smaller. We compute a solution and subsequently construct a deflated problem, which has the same solutions as the original problem except of the solution we have already computed.A general solver independent deflation technique is available in NEP-PACK based on increasing the problem size. (There are also NEP-solver deflation techniques incoprorated in, e.g., in the nonlinear Arnoldi method and the Jacobi-Davidson method.) The solver independent technique is inspired by what is described in the PhD thesis of Cedric Effenberger. It is implemented in the method effenberger_deflation.julia> # first compute a solution\njulia> (λ1,v1)=quasinewton(nep,λ=0,v=ones(size(nep,1)))\njulia> # Construct a deflated NEP where we remove (λ1,v1)\njulia> dnep=deflate_eigpair(nep,λ1,v1)\njulia> # The dnep is a new NEP but with dimension increased by one\njulia> size(nep)\n(5, 5)\njulia> size(dnep)\n(6, 6)We now illustrate that we can avoid reconvergence:julia> (λ4,v4)=quasinewton(dnep,λ=-1,v=ones(size(dnep,1)),maxit=1000)\n(0.8347353572199264 + 0.0im, Complex{Float64}[10.6614+0.0im, 0.351814+0.0im, -0.940539+0.0im, 1.10798+0.0im, 3.53392+0.0im, -0.447213+0.0im])Note: In contrast to the initial example, starting value λ=-1 does not lead to converge to the eigenvalue we obtained from starting value λ=0.The computed solution is indeed a solution to the original NEP since M(λ4) is singular:julia> minimum(svdvals(compute_Mder(nep,λ4)))\n1.2941045763733582e-14In fact, you can even start with the first starting value λ=0, and get a new solutionjulia> quasinewton(dnep,λ=0,v=ones(size(dnep,1)),maxit=1000)\n(0.8347353572199577 + 0.0im, Complex{Float64}[9.28596+0.0im, 0.306425+0.0im, -0.819196+0.0im, 0.965031+0.0im, 3.07799+0.0im, -0.389516+0.0im])"
},

{
    "location": "deflate_tutorial/#Repeated-deflation-1",
    "page": "Tutorial 3 (Deflation)",
    "title": "Repeated deflation",
    "category": "section",
    "text": "The above procedure can be repeated by calling deflate_eigpair on the deflated NEP. This effectively deflates another eigenpair (but without creating a recursive deflated nep structure).function multiple_deflation(nep,λ0,p)\n   n=size(nep,1);\n   dnep=nep;\n   for k=1:p\n      # Compute one solution of the deflated problem\n      (λ2,v2)=quasinewton(dnep,λ=λ0,v=ones(size(dnep,1)),maxit=1000);\n      # expand the invariant pair\n      dnep=deflate_eigpair(dnep,λ2,v2)\n   end\n   return get_deflated_eigpairs(dnep);\n\nendWe can now compute several solutions by calling multiple_deflation. Note that we use the same starting eigenvalue for all eigenvalues: 0.5im. It has to be complex in this case, since if it was real, we would not find complex solution and this problem only has two real eigenvalues.julia> nep=nep_gallery(\"dep0\");\njulia> (Λ,VV)=multiple_deflation(nep,0.5im,3)\n(Complex{Float64}[-0.358719+1.33901e-14im, 0.834735+7.05729e-15im, -0.0409352+1.48601im], Complex{Float64}[-0.0148325-0.316707im -0.670282+0.268543im -0.41261+0.229832im; 0.00746549+0.159405im -0.0881321+0.0353094im 0.360381-0.0796982im; … ; 0.0260924+0.557131im -0.298976+0.119782im -0.201138+0.0524051im; 0.0319648+0.68252im -0.528234+0.211633im -0.668441+0.121828im])The values in Λ and VV are eigenpairs:julia> norm(compute_Mlincomb(nep,Λ[1],VV[:,1]))\n2.0521012310648373e-13\njulia> norm(compute_Mlincomb(nep,Λ[2],VV[:,2]))\n2.8707903010898464e-13\njulia> norm(compute_Mlincomb(nep,Λ[3],VV[:,3]))\n1.883394132275381e-13"
},

{
    "location": "deflate_tutorial/#The-theory-in-the-background-1",
    "page": "Tutorial 3 (Deflation)",
    "title": "The theory in the background",
    "category": "section",
    "text": "The deflation is based on a theory for NEP essentially stating that if (sx) is an eigenpair, then the extended nonlinear eigenvalue problemT(λ)=beginbmatrixM(λ)M(λ)x(s-λ)^-1 x^T  0endbmatrixhas the same eigenvalues as the original problem (under certain conditions quite general conditions which are assumed to be satisfied). More eigenpairs can be deflated with techniques of partial Schur factorizations (which the user does not need to use). When we create a deflated NEP, we create the NEP T.There are several ways to represent the T, which is why deflation has several modes. If you runjulia> dnep=deflate_eigpair(nep,λ1,v1,mode=:SPMF)the dnep will be of the type AbstractSPMF. More precisely, ifM(λ)=A_1f_1(λ)+cdots+A_mf_m(λ)the deflated NEP will beT(λ)=\nbeginbmatrixA_100  0endbmatrixf_1(λ)+cdots+\nbeginbmatrixA_m00  0endbmatrixf_m(λ)+\nbeginbmatrix0A_1x0  0endbmatrixfracf_1(λ)s-λ+cdots+\nbeginbmatrix0A_mx0  0endbmatrixfracf_m(λ)s-λ+\nbeginbmatrix00x^T  0endbmatrixClearly, the deflated NEP will have more SPMF-terms, and the mode=:SPMF, is not recommended if you have many SPMF-terms. (Some additional exploitation is however implemented, since we can use the fact that the introduced terms are of low rank, and therefore naturally represented as a LowRankFactorizedNEP.)If you select mode=:Generic, the compute functions are implemented without the use of SPMF, and can be more efficient if the NEP has many SPMF-terms. When mode=:MM the compute-functions are all implemented by calls to compute_MM. This will not be efficient if compute_Mder(nep,λ,der) where  der>0 is needed.(Image: To the top)"
},

{
    "location": "tutorial_call_python/#",
    "page": "Tutorial 4 (Python NEP)",
    "title": "Tutorial 4 (Python NEP)",
    "category": "page",
    "text": ""
},

{
    "location": "tutorial_call_python/#Tutorial:-Solving-NEP-defined-in-Python-1",
    "page": "Tutorial 4 (Python NEP)",
    "title": "Tutorial: Solving NEP defined in Python",
    "category": "section",
    "text": ""
},

{
    "location": "tutorial_call_python/#A-problem-defined-in-Python-1",
    "page": "Tutorial 4 (Python NEP)",
    "title": "A problem defined in Python",
    "category": "section",
    "text": "Julia is a great programming language, but your problem may not be easy to define in Julia code, e.g., for legacy reasons. Don\'t let that prevent you from using the package. We now show how a problem defined in python can be solved with NEP-PACK.The following python code correspond to the NEPM(λ)=beginbmatrix12newline34endbmatrix+\nλbeginbmatrix00newline01endbmatrix+\ne^λbeginbmatrix11newline11endbmatrixThe code has two functions: one that can compute an evaluation of M(λ) and one that can form a linear combination of derivatives  sum_i=1^kM^(k)(λ)x_iPut a file  mynep.py  in your current directory with the following contents:import numpy as np;\nimport cmath as m;\ndef compute_M(s):\n    \"\"\"Compute the matrix M(s) for a given eigenvalue approximation\"\"\"\n    A=np.matrix(\'1 2; 3 4\');  B=np.matrix(\'0 0; 0 1\');   C=np.matrix(\'1 1; 1 1\');\n    M=A+s*B+m.exp(s)*C\n    return M\n\ndef compute_Mlincomb(s,X):\n    \"\"\"Compute the linear combination of derivatives for value s\"\"\"\n    A=np.matrix(\'1 2; 3 4\');  B=np.matrix(\'0 0; 0 1\');   C=np.matrix(\'1 1; 1 1\');\n\n    X=np.matrix(X) # Explicitly convert to matrix\n    z=np.zeros((2,1));\n    # Zeroth derivative\n    z=z+A*X[:,0]\n    z=z+B*(s*X[:,0])\n    z=z+C*(m.exp(s)*X[:,0])\n\n    # First derivative\n    if (np.size(X,1)>1):\n        z=z+B*(X[:,1])+C*(m.exp(s)*X[:,1])\n    # Higher derivatives\n    if (np.size(X,1)>1):\n        for k in range(2,np.size(X,1)):\n            z=z+C*(m.exp(s)*X[:,k])\n    return z"
},

{
    "location": "tutorial_call_python/#Implementation-in-NEP-PACK-1",
    "page": "Tutorial 4 (Python NEP)",
    "title": "Implementation in NEP-PACK",
    "category": "section",
    "text": "One of the advantages of the Julia language is that it is reasonably easy to interface with code written in other langauges. The Julia package PyCall simplifies the use of Python code and Julia code.We first initiate PyCall as follows. Note that the pushfirst! command is needed, otherwise the module defined in the file mynep.py we gave above will not be found. (PyCall does not include the current directory in the module search path by default.)using PyCall\npushfirst!(PyVector(pyimport(\"sys\")[\"path\"]), \"\")\nlocal mynep\n@pyimport mynep as mynepThis gives us direct access to the compute_M and compute_Mlincomb functions from python, e.g., if we want to evaluate M(3+3i) we run this codejulia> mynep.compute_M(3+3im)\n2×2 Array{Complex{Float64},2}:\n -18.8845+2.83447im  -17.8845+2.83447im\n -16.8845+2.83447im  -12.8845+5.83447imWe now just need to define a NEP which calls these routines. It is achieved by defining a new NEP-PACK type, for which we have define the size-function, which is hard-coded in this example.using NonlinearEigenproblems\nimport NonlinearEigenproblems.size\nimport NonlinearEigenproblems.compute_Mlincomb;\nimport NonlinearEigenproblems.compute_Mder;\nstruct PyNEP <: NEP # Set up a dummy type for our specific NEP\nend\nsize(::PyNEP) = (2,2)\nsize(::PyNEP,::Int) = 2As explained in NEPTypes, a NEP is defined by its compute functions. Here is how you define two compute functions that call our python-defined NEP:function compute_Mder(::PyNEP,s::Number,der::Integer=0)\n    if (der>0)\n        error(\"Higher derivatives not implemented\");\n    end\n    return mynep.compute_M(complex(s)); # Call python\nend\nfunction compute_Mlincomb(::PyNEP,s::Number,X::AbstractVecOrMat)\n    XX=complex(reshape(X,size(X,1),size(X,2))) # Turn into a matrix\n    return mynep.compute_Mlincomb(complex(s),XX); # Call python\nendWe now create an object of our newly created type and we can access the NEP with the NEP-PACK specific compute functions:julia> pnep=PyNEP();\njulia> compute_Mder(pnep,3+3im)\n2×2 Array{Complex{Float64},2}:\n -18.8845+2.83447im  -17.8845+2.83447im\n -16.8845+2.83447im  -12.8845+5.83447im"
},

{
    "location": "tutorial_call_python/#Solving-the-NEP-1",
    "page": "Tutorial 4 (Python NEP)",
    "title": "Solving the NEP",
    "category": "section",
    "text": "Since a NEP-object is defined by its compute functions, we can now use many NEP-solvers to solve this problem. Here we use IAR:\njulia> (λv,vv)=iar(pnep,v=[1;1],σ=1,displaylevel=1,Neig=3);\nIteration:1 conveig:0\nIteration:2 conveig:0\nIteration:3 conveig:0\nIteration:4 conveig:0\nIteration:5 conveig:0\nIteration:6 conveig:0\nIteration:7 conveig:0\n....\nIteration:26 conveig:1\nIteration:27 conveig:1\nIteration:28 conveig:1\njulia>We can verify that we actually computed solutions as follows:julia> λ=λv[1]; # Take the first eigenpair\njulia> v=vv[:,1]\n2-element Array{Complex{Float64},1}:\n -0.7606536306084172 + 4.723354443026557e-18im\n   0.568748796395112 + 1.8318449036023953e-19im\njulia> A=[1 2 ; 3 4];\njulia> B=[0 0 ; 0 1];\njulia> C=[1 1 ; 1 1];\njulia> r=A*v+λ*B*v+exp(λ)*C*v;\n2-element Array{Complex{Float64},1}:\n -3.3306690738754696e-16 + 1.4448222154182884e-17im\n -1.0547118733938987e-15 + 2.4802198512062408e-17imResidual is almost zero, so we have a solution.Note: The above functionality can also be achieved with  Mder_NEP in the development version of NEP-PACK(Image: To the top)"
},

{
    "location": "tutorial_matlab1/#",
    "page": "Tutorial 5 (MATLAB 1)",
    "title": "Tutorial 5 (MATLAB 1)",
    "category": "page",
    "text": ""
},

{
    "location": "tutorial_matlab1/#Tutorial:-Solving-NEP-defined-in-MATLAB-1",
    "page": "Tutorial 5 (MATLAB 1)",
    "title": "Tutorial: Solving NEP defined in MATLAB",
    "category": "section",
    "text": ""
},

{
    "location": "tutorial_matlab1/#A-problem-defined-in-MATLAB-1",
    "page": "Tutorial 5 (MATLAB 1)",
    "title": "A problem defined in MATLAB",
    "category": "section",
    "text": "MATLAB is the de-facto standard language for many tasks in scientific computing. If you have a NEP defined in MATLAB, you can quite easily use the NEP-solvers of this package. Below is a description of one way to interface with MATLAB. The example illustrates the principle at the cost of some efficiency.Suppose you have the following NEP in MATLABM(lambda)=A_0+lambda A_1+exp(lambda A_2)The problem can be defined in MATLAB as follows. This is the contents of the file compute_derivative_k.mfunction Z=compute_derivative_k(s,k)\n     randn(\'seed\',0);\n     n=10;\n     A0=randn(n,n); A1=randn(n,n);\n     Z=zeros(n,n);\n     if (k==0)\n         Z=A0+s*A1;\n     end\n     if (k==1)\n         Z=A1;\n     end\n     Z=Z+(A1^k)*expm(s*A1);\nend"
},

{
    "location": "tutorial_matlab1/#Implementation-in-NEP-PACK-1",
    "page": "Tutorial 5 (MATLAB 1)",
    "title": "Implementation in NEP-PACK",
    "category": "section",
    "text": "We define a new type representing our MATLAB-NEP. The size is hardcoded in this example.struct MATLABNEP <: NEP\nend\nBase.size(nep::MATLABNEP) = (10,10)\nBase.size(nep::MATLABNEP,::Int) = 10Initiate the MATLAB package and prepare to integrate with NEP-PACK:julia> using MATLAB; # requires MATLAB to be installed\njulia> mat\"addpath(\'.\')\" # Add path to your m-file\njulia> import NonlinearEigenproblems.compute_Mder;\njulia> import NonlinearEigenproblems.compute_Mlincomb;\njulia> import NonlinearEigenproblems.compute_Mlincomb_from_Mder;NEP-objects in NEP-PACK are defined from compute-functions (as we describe in NEPTypes) and we need to define the derivative computation function, which calls the MATLAB-code. We also specify that linear combinations of derivatives should be computed by calling compute_Mder in the naive way:function compute_Mder(::MATLABNEP,s::Number,der::Integer=0)\n    return mat\"compute_derivative_k(double($s),double($der))\"\nend\ncompute_Mlincomb(nep::MATLABNEP,λ::Number,V::AbstractVecOrMat, a::Vector) = compute_Mlincomb_from_Mder(nep,λ,V,a)\ncompute_Mlincomb(nep::MATLABNEP,λ::Number,V::AbstractVecOrMat) = compute_Mlincomb(nep,λ,V, ones(eltype(V),size(V,2)))Now you can instantiate the NEP and use your favorite NEP-solver, in this case we use newtonqr.julia> nep=MATLABNEP();\njulia> (λ,v)=newtonqr(nep,λ=-3,displaylevel=1,maxit=30,v=ones(10))\nIteration: 1 errmeasure: 1.0335933094121779\nIteration: 2 errmeasure: 0.305924622401145\nIteration: 3 errmeasure: 0.6000405833925101\nIteration: 4 errmeasure: 0.07375061613894424\nIteration: 5 errmeasure: 0.009351656273646538\nIteration: 6 errmeasure: 8.954564844507815e-5\nIteration: 7 errmeasure: 7.446596374256243e-9\nIteration: 8 errmeasure: 1.8095439571351245e-15\n(-0.8842075212949918 + 0.0im, Complex{Float64}[0.544936+0.0im, 0.641218+0.0im, 0.089366+0.0im, -0.0975048+0.0im, 0.133397+0.0im, 1.0+0.0im, -0.836009+0.0im, -0.00753176+0.0im, 0.270149+0.0im, -0.664448+0.0im], [0.354722, -0.0659026, -0.465767, 0.079273, -0.524316, -0.372411, -0.0129146, -0.386585, -0.140157, 0.252488])The residual is small and we have a solutionjulia> norm(compute_Mlincomb(nep,λ,v))\n3.111596859559977e-15Note: The above functionality can also be achieved with  Mder_NEP in the development version of NEP-PACK(Image: To the top)"
},

{
    "location": "tutorial_fortran1/#",
    "page": "Tutorial 6 (FORTRAN 1)",
    "title": "Tutorial 6 (FORTRAN 1)",
    "category": "page",
    "text": ""
},

{
    "location": "tutorial_fortran1/#Tutorial:-Solving-a-NEP-defined-in-fortran-1",
    "page": "Tutorial 6 (FORTRAN 1)",
    "title": "Tutorial: Solving a NEP defined in fortran",
    "category": "section",
    "text": ""
},

{
    "location": "tutorial_fortran1/#A-problem-defined-in-fortran-1",
    "page": "Tutorial 6 (FORTRAN 1)",
    "title": "A problem defined in fortran",
    "category": "section",
    "text": "A situation may arise where you  have to (or have the opportunity to) work with fortran code. This is not as uncommon as many think, mostly due to the legacy software in many engineering disciplines. The Julia language is designed with interoperability in mind. Don\'t let some fortran code scare you. The following tutorial illustrates interoperability in Julia and how to use it in NEP-PACK.We assume our NEP is defined in fortran code and defines the problemM(lambda)=A_0+lambda^3e_ne_1^T-exp(lambda)e_1e_n^Twhere A_0 is a finite difference approximation of a scaled Laplacian matrix. The problem can be naturally represented in sparse format, which we will also take advantage of.The fortran implementation of the problem is given in the following subroutine which computes three vectors I, J and F, where I and J correspond to row and column pointers and F the value of the sparse matrix. The variable s=λ is the evaluation point. The input der determines which derivative of M should be computed. (If derivatives are not easily available in your application, see next section.)This is the implementation which we put in myproblem.f95:subroutine mder(s,n,der,I,J,F)\n  real*8, intent(in) :: s\n  integer*8, intent(in) :: n\n  integer*8, intent(in) :: der\n  integer*8, intent(out), dimension(3*n):: I\n  integer*8, intent(out), dimension(3*n):: J\n  real*8, intent(out), dimension(3*n):: F\n  integer*8 :: p\n  real*8 :: factor\n  if (der==0) then\n     factor=1;\n  else\n     factor=0;\n  end if\n  do p = 1, n\n     I(p) = p\n     J(p) = p\n     F(p) = 2.0*factor;\n  end do\n  do p = 1, n-1\n     I(n+p) = p\n     J(n+p) = p+1\n     F(n+p) = -1.0*factor;\n     I(2*n+p) = p+1\n     J(2*n+p) = p\n     F(2*n+p) = -1.0*factor;\n  end do\n  I(2*n)=n;\n  J(2*n)=1;\n  if (der == 0) then\n     F(2*n)=s*s*s;\n  else if (der == 1) then\n     F(2*n)=3*s*s;\n  else if (der == 2) then\n     F(2*n)=3*2*s;\n  else if (der == 3) then\n     F(2*n)=3*2;\n  else\n     F(2*n)=0;\n  end if\n  I(3*n)=1;\n  J(3*n)=n;\n  F(3*n)=-exp(s);\nend subroutine mder"
},

{
    "location": "tutorial_fortran1/#Compile-and-call-the-code-1",
    "page": "Tutorial 6 (FORTRAN 1)",
    "title": "Compile and call the code",
    "category": "section",
    "text": "Compile the code to a shared object file. With ubuntu linux and GNU fortran, this is achieved with$ gfortran -shared -fPIC -o myproblem.so myproblem.f95(Under the windows OS, you would want to compile the code to a dll-file.) In Julia, you can now call this routine using the Libdl package:using Libdl;\nmylib=Libdl.dlopen(\"./myproblem.so\")\nλ=0.3;\nder=0;\nn=3; # Problem size\nI=Vector{Int}(undef,3*n); # 3*n nnz elements in matrix\nJ=Vector{Int}(undef,3*n); # 3*n nnz elements in matrix\nF=Vector{Float64}(undef,3*n); # 3*n nnz elements in matrix\n# This is the call to the fortran code\n# Note that :mder_ is a reference to a fortran subroutine:\n# it must be lower-case and  a _ should be appended\nccall(Libdl.dlsym(mylib,:mder_), Nothing,\n   (Ref{Float64}, Ref{Int},Ref{Int},  Ptr{Int}, Ptr{Int}, Ptr{Float64}),\n   λ, n, der, I, J, F)The above code sets vectors I, J and F such that they represent a sparse matrix. The sparse matrix can be constructed with the sparse command:julia> using SparseArrays\njulia> A=sparse(I,J,F)\n3×3 SparseMatrixCSC{Float64,Int64} with 9 stored entries:\n  [1, 1]  =  2.0\n  [2, 1]  =  -1.0\n  [3, 1]  =  0.027\n  [1, 2]  =  -1.0\n  [2, 2]  =  2.0\n  [3, 2]  =  -1.0\n  [1, 3]  =  -1.34986\n  [2, 3]  =  -1.0\n  [3, 3]  =  2.0\njulia> Matrix(A)\n3×3 Array{Float64,2}:\n  2.0    -1.0  -1.34986\n -1.0     2.0  -1.0\n  0.027  -1.0   2.0"
},

{
    "location": "tutorial_fortran1/#Implementation-in-NEP-PACK:-basic-usage-1",
    "page": "Tutorial 6 (FORTRAN 1)",
    "title": "Implementation in NEP-PACK: basic usage",
    "category": "section",
    "text": "(Note: The example below is based on Mder_NEP and Mder_Mlincomb_NEP which are available starting from NEP-PACK version 0.2.5.)We saw above how to compute a derivative matrix with a fortran call. This is sufficient to define a NEP-object in NEP-PACK using the Mder_NEP type.julia> n=100;\njulia> # A function which allocates vectors and calls fortran,\njulia> # and returns a sparse matrix\njulia> function my_Mder(λ::Float64,der::Int=0)\n  # Index vectors: Length 3*n since we have 3n nnz elements in matrix\n  I=Vector{Int}(undef,3*n);\n  J=Vector{Int}(undef,3*n);\n  F=Vector{Float64}(undef,3*n);\n  ccall(Libdl.dlsym(mylib,:mder_), Nothing,\n     (Ref{Float64}, Ref{Int},Ref{Int},  Ptr{Int}, Ptr{Int}, Ptr{Float64}),\n     λ, n, der, I, J, F)\n  return sparse(I,J,F);\nend\njulia> nep=Mder_NEP(n,my_Mder)\njulia> quasinewton(Float64,nep,λ=-1.8,v=ones(n), displaylevel=1)\nPrecomputing linsolver\nIteration:  1 errmeasure:4.903565024143569095e-01, λ=-1.8\nIteration:  2 errmeasure:8.776860766232853772e-02, λ=-1.3816406142423465\nIteration:  3 errmeasure:6.109070850428219984e-02, λ=-2.0060080798679913\n...\nIteration: 11 errmeasure:5.305001776886219717e-12, λ=-1.7940561686588974\nIteration: 12 errmeasure:2.895637837297152945e-14, λ=-1.7940561686787597\nIteration: 13 errmeasure:3.874312247075750238e-16, λ=-1.7940561686786516\n(-1.7940561686786516, [76.9596, 80.634, 84.3084, 87.9827, 91.6571, 95.3315, 99.0059, 102.68, 106.355, 110.029  …  407.653, 411.328, 415.002, 418.676, 422.351, 426.025, 429.699, 433.374, 437.048, 440.723])"
},

{
    "location": "tutorial_fortran1/#Implementation-in-NEP-PACK:-basic-usage,-no-derivatives-1",
    "page": "Tutorial 6 (FORTRAN 1)",
    "title": "Implementation in NEP-PACK: basic usage, no derivatives",
    "category": "section",
    "text": "In the above example, all the derivatives of M were easy to compute by hand and made available in the fortran subroutine. In many applications, the nonlinearity is not so simple, and its derivatives may require man-hours to analyze and implement, or may be very computationally expensive.Most NEP-algorithms in NEP-PACK do require the derivative (except for certain versions of nleigs, broyden, contour_beyn and sgiter). However, many NEP-algorithms do not require a very accurate derivative. We now show how you can make a numerical approximation of the derivative available, if you do not want to compute the exact derivative. The example below uses finite differences, but any numerical differentiation procedure may be used. (The code does not use derivatives in mder, since all calls are done with der=0.)julia> n=100;\njulia> function my_Mder_FD(λ::Float64,der::Int=0)\n  if (der>1)\n   error(\"Higher derivatives not supported\");\n  end\n  # 3*n nnz elements in matrix\n  I=Vector{Int}(undef,3*n);\n  J=Vector{Int}(undef,3*n);\n  F1=Vector{Float64}(undef,3*n);\n  ccall(Libdl.dlsym(mylib,:mder_), Nothing,\n     (Ref{Float64}, Ref{Int},Ref{Int},  Ptr{Int}, Ptr{Int}, Ptr{Float64}),\n     λ, n, 0, I, J, F1)\n  if (der==0)\n     return sparse(I,J,F1);\n  end\n\n  if (der==1)\n     # Make another fortran call to make a finite difference approximation\n     ee=sqrt(eps());\n     F2=Vector{Float64}(undef,3*n);\n     ccall(Libdl.dlsym(mylib,:mder_), Nothing,\n          (Ref{Float64}, Ref{Int},Ref{Int},  Ptr{Int}, Ptr{Int}, Ptr{Float64}),\n          λ-ee, n, 0, I, J, F2)\n     # We exploit the fact that the sparsity pattern is independent of λ\n     Fder=(F1-F2)/ee;\n     return sparse(I,J,Fder);\n  end\nendCreate the NEP and call a solver, in this case MSLP.julia> nep=Mder_NEP(n,my_Mder_FD)\njulia> mslp(Float64,nep,λ=-1.8, displaylevel=1)\nIteration:1 errmeasure:5.145479494934554e-6 λ=-1.7941228234498503\nIteration:2 errmeasure:6.604789080027513e-10 λ=-1.7940561772509709\nIteration:3 errmeasure:4.3096620402514632e-16 λ=-1.794056168678654\n(-1.794056168678654, [0.0275122, 0.0288257, 0.0301393, 0.0314528, 0.0327664, 0.0340799, 0.0353935, 0.036707, 0.0380206, 0.0393341  …  0.145731, 0.147045, 0.148358, 0.149672, 0.150986, 0.152299, 0.153613, 0.154926, 0.15624, 0.157553])"
},

{
    "location": "tutorial_fortran1/#Implementation-in-NEP-PACK:-advanced-usage-1",
    "page": "Tutorial 6 (FORTRAN 1)",
    "title": "Implementation in NEP-PACK: advanced usage",
    "category": "section",
    "text": "The above procedure requires that sparse matrices are created every time the NEP is accessed. This may be computationally demanding. A common call in NEP-PACK, is to compute the matrix vector product M(λ)*v. If the creation of the matrix M(λ) requires considerable computation or storage, you may want to implement the function which directly computes the matrix vector product. This is made available to the NEP-PACK object as follows.Add the following to your myproblem.f95:subroutine matvec(s,n,v,x)\n  real*8, intent(in) :: s\n  integer*8, intent(in) :: n\n  real*8, intent(in), dimension(n):: v\n  real*8, intent(out), dimension(n):: x\n  integer*8 :: p\n  do p = 1, n\n      x(p)=2*v(p)\n  end do\n  do p = 1, n-1\n      x(p)= x(p) - v(p+1)\n      x(p+1)= x(p+1) - v(p)\n  end do\n  x(n)=x(n)+v(1)*s*s*s;\n  x(1)=x(1)-v(n)*exp(s);\nend subroutine matvecAfter recompilation of the library file myproblem.so, restarting Julia and loading again myproblem.so, we can make a matvec function available.julia> function my_matvec(λ,v)\n   v=vec(v);  # It has to be a vector\n   x=copy(v); # Allocate a vector for storage of result\n   ccall(Libdl.dlsym(mylib,:matvec_), Nothing,\n      (Ref{Float64}, Ref{Int}, Ptr{Float64},  Ptr{Float64}),\n      λ, n, v, x)\n   return x;\nend\njulia> nep2=Mder_Mlincomb_NEP(n,my_Mder,1,my_matvec,0);The last line creates a NEP defined from both matrix derivative computations as well as matrix vector products (or more generally linear combinations of derivatives). The 1 and 0 specify the highest derivative available for the two functions. We can now solve it with many methods, e.g. resinv.julia> resinv(Float64,nep2,λ=-1.8,v=ones(n),displaylevel=1)\nIteration:  1 errmeasure:4.903565024143570761e-01\nIteration:  2 errmeasure:1.145360525649362360e-01\n...\nIteration:  7 errmeasure:5.834331567428062526e-13\nIteration:  8 errmeasure:2.989922602862964175e-15\n(-1.794056168678641, [0.0275122, 0.0288257, 0.0301393, 0.0314528, 0.0327664, 0.0340799, 0.0353935, 0.036707, 0.0380206, 0.0393341  …  0.145731, 0.147045, 0.148358, 0.149672, 0.150986, 0.152299, 0.153613, 0.154926, 0.15624, 0.157553])When using NEP-solvers requiring higher derivatives, the above procedure can also be used to compute linear combinations of higher derivatives by implementing a compute_Mlincomb which takes a matrix as input.(Image: To the top)"
},

]}
