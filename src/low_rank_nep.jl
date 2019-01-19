export LowRankFactorizedNEP

"SPMF with low rank LU factors for each matrix."
struct LowRankFactorizedNEP{S<:AbstractMatrix{<:Number}} <: AbstractSPMF{AbstractMatrix}
    spmf::SPMF_NEP
    r::Int          # Sum of ranks of matrices
    L::Vector{S}    # Low rank L factors of matrices
    U::Vector{S}    # Low rank U factors of matrices
end

function LowRankFactorizedNEP(L::Vector{S},U::Vector{S},f) where {S<:AbstractMatrix}
    q=size(L,1);
    A = Vector{S}(undef, q)
    r::Int=0

    for k = 1:q
        # if A is not specified, create it from LU factors
        A[k] = L[k] * U[k]'
        r += size(U[k], 2)
    end
    return LowRankFactorizedNEP{S}(SPMF_NEP(A, f, align_sparsity_patterns=true), r, L, U)


end
function LowRankFactorizedNEP(L::Vector{S},U::Vector{S},A, f) where {S<:AbstractMatrix}
    q=size(L,1);
    r::Int=0
    for k = 1:q
        r += size(U[k], 2)     # Compute the rank
    end
    return LowRankFactorizedNEP{S}(SPMF_NEP(A, f, align_sparsity_patterns=true), r, L, U)


end



"Create an empty LowRankFactorizedNEP."
LowRankFactorizedNEP(::Type{T}, n) where T<:Number =
    LowRankFactorizedNEP(SPMF_NEP(n), 0, Vector{Matrix{T}}(), Vector{Matrix{T}}())

# forward function calls to SPMF
compute_Mder(nep::LowRankFactorizedNEP, λ::T, i::Int = 0) where T<:Number =
    compute_Mder(nep.spmf, λ, i)

compute_Mlincomb(nep::LowRankFactorizedNEP, λ::T, V::Union{Vector{T}, Matrix{T}}, a::Vector = ones(T, size(V, 2))) where T<:Number =
    compute_Mlincomb(nep.spmf, λ, V, a)

compute_MM(nep::LowRankFactorizedNEP, par...)  =
    compute_MM(nep.spmf, par...)

size(nep::LowRankFactorizedNEP) = size(nep.spmf)
size(nep::LowRankFactorizedNEP, dim) = size(nep.spmf, dim)

get_Av(nep::LowRankFactorizedNEP) = get_Av(nep.spmf)
get_fv(nep::LowRankFactorizedNEP) = get_fv(nep.spmf)
