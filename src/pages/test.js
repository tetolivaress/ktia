const sortPaddockTypeByTotalArea = () => {
  const paddocksHectaresAmount = paddockType.map(paddock => {
    const paddockDetail = paddocks.filter(item => item.paddockTypeId === paddock.id);
    const paddockMeters = paddockDetail.map(({ area }) => area).reduce((previous, current) => previous + current);
    const paddockHectares = paddockMeters / 10000;
    return {...paddock, paddockHectares};
  });
  return paddocksHectaresAmount.sort((a, b) => {
	  if (b.paddockHectares > a.paddockHectares) return 1;
	  if (b.paddockHectares < a.paddockHectares) return -1;
	  return 0;
  })
}

const sortFarmManagerByAdminArea = () => {
  const managerHectaresAmount = paddockManagers.map(({name, id}) => {
    const managerAreas = paddocks.filter(({ paddockManagerId }) => paddockManagerId === id);
    const managerMeters = managerAreas.map(({ area }) => area).reduce((previous, current) => previous + current);
    const managerHectares = managerMeters / 10000;
    return {name, managerHectares}
  });

  return managerHectaresAmount.sort((a, b) => {
	  if (b.managerHectares > a.managerHectares) return 1;
	  if (b.managerHectares < a.managerHectares) return -1;
	  return 0;
  });
}
