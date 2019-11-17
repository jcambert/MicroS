using AutoMapper;
using MicroS_Common.Handlers;
using System.Threading.Tasks;
using <%=namespace%>.domain.<%= changeCase.pascalCase(name) %>s.Dto;
using <%=namespace%>.domain.<%= changeCase.pascalCase(name) %>s.Queries;
using <%=namespace%>.Services.<%= changeCase.pascalCase(name) %>s.Repositories;

/// <summary>
/// @author: <%=author.name%>
/// @email: <%=author.email%>
/// @created_on: <%= new Date()%>
/// </summary>
namespace <%=namespace%>.Services.<%= changeCase.pascalCase(name) %>s.Handlers
{
    /// <summary>
    /// Get <%= changeCase.pascalCase(name) %> Handler
    /// </summary>
    public partial class Get<%= changeCase.pascalCase(name) %>Handler :  IQueryHandler<Get<%= changeCase.pascalCase(name) %>, <%= changeCase.pascalCase(name) %>Dto>
    {
        #region private variables
        private readonly I<%= changeCase.pascalCase(name) %>sRepository _productsRepository;
        private readonly IMapper _mapper;
        #endregion

        #region Constructors
        public Get<%= changeCase.pascalCase(name) %>Handler(I<%= changeCase.pascalCase(name) %>sRepository productsRepository, IMapper mapper)
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
        public async Task<<%= changeCase.pascalCase(name) %>Dto> HandleAsync(Get<%= changeCase.pascalCase(name) %> query)
        {
            var model = await _productsRepository.GetAsync(query.Id);

            return model == null ? null : _mapper.Map<<%= changeCase.pascalCase(name) %>Dto>(model);
            /*new <%= changeCase.pascalCase(name) %>Dto
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