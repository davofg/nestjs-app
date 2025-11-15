export interface TypeOrmMapper<TDomain, TInfrastructure> {
    /**
     * @param infrastructureEntity
     * @returns TDomain
     */
    toDomain(infrastructureEntity: TInfrastructure): TDomain;

    /**
     * @param TDomain
     * @returns Partial<TInfrastructure>
     */
    fromDomain(domainEntity: TDomain): TInfrastructure;
}