using AutoMapper;
using MicroS_Common.Handlers;
using System.Threading.Tasks;
using <%=namespace%>.domain.<%= changeCase.titleCase(name) %>s.Dto;
using <%=namespace%>.domain.<%= changeCase.titleCase(name) %>s.Queries;
using <%=namespace%>.Services.<%= changeCase.titleCase(name) %>s.Repositories;

/// <summary>
/// @author: <%=author.name%>
/// @email: <%=author.email%>
/// @created_on: <%= new Date()%>
/// </summary>
namespace <%=namespace%>.Services.<%= changeCase.titleCase(name) %>s.Handlers
{
    /// <summary>
    /// Get <%= changeCase.titleCase(name) %> Handler
    /// </summary>
    public partial class Get<%= changeCase.titleCase(name) %>Handler :  IQueryHandler<Get<%= changeCase.titleCase(name) %>, <%= changeCase.titleCase(name) %>Dto>
    {
        #region private variables
        private readonly I<%= changeCase.titleCase(name) %>sRepository _productsRepository;
        private readonly IMapper _mapper;
        #endregion

        #region Constructors
        public Get<%= changeCase.titleCase(name) %>Handler(I<%= changeCase.titleCase(name) %>sRepository productsRepository, IMapper mapper)
        {
            _productsRepository = productsRepository;
            _mapper = mapper;
        }
        #endregion

        #region public functions
        /// <summary>
        ///  Handle the command with context
        /// </summary>
        /// <param name="command">The command to handle</param>
        /// <param name="context">The correlation context</param>
        /// <returns></returns>
        public async Task<<%= changeCase.titleCase(name) %>Dto> HandleAsync(Get<%= changeCase.titleCase(name) %> query)
        {
            var model = await _productsRepository.GetAsync(query.Id);

            return model == null ? null : _mapper.Map<<%= changeCase.titleCase(name) %>Dto>(model);
            /*new <%= changeCase.titleCase(name) %>Dto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Vendor = product.Vendor,
                Price = product.Price
            };*/
        }
        #endregion
    }
}